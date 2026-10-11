"use client";

import { useState, useEffect } from "react";
import { addDays, format, isToday, subDays } from "date-fns";
import { AlignLeft, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Plus, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, PageHeader, Segmented } from "@/components/layout/page";
import { AddTaskDialog } from "@/components/tasks/add-task-dialog";
import { TaskList } from "@/components/tasks/task-list";
import { TimelineView } from "@/components/tasks/timeline-view";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import { ensureTodaysHabits } from "@/app/actions/habits";

export default function TasksPage() {

  // State

  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSubtask, setNewSubtask] = useState({ title: "", targetValue: "", unit: "" });
  const [newTask, setNewTask] = useState({title: "", description: "", priority: "LOW", isRecurring: false, date: format(new Date(), "yyyy-MM-dd"), startTime: "", duration: "60", subtasks: [] as any[] });
  const [mobileView, setMobileView] = useState<"list" | "timeline">("list");
  const [activeTab, setActiveTab] = useState("tasks");
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  // Handlers

// Fetch tasks for the selected date. When the selected date is TODAY we first
// run ensureTodaysHabits() — the same idempotent safety-net the dashboard uses —
// so habit instances exist even when the user opens /tasks before /dashboard.
useEffect(() => {
    const timer = setTimeout(async () => {
        try {
            if (isToday(selectedDate)) {
                await ensureTodaysHabits(
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                ).catch(() => {});
            }
        } finally {
            fetchTasks();
        }
    }, 400);

    return () => clearTimeout(timer);
}, [selectedDate]);

async function handleDropTask(e: React.DragEvent, hour: number) {
      e.preventDefault();
      if (!draggedTaskId) return;

      const taskToUpdate = tasks.find(t => t.id === draggedTaskId);
      if (!taskToUpdate) return;

      const newStartTime = new Date(selectedDate);
      newStartTime.setHours(hour);
      newStartTime.setMinutes(0);
      newStartTime.setSeconds(0);

      setTasks(prev => prev.map(t =>
          t.id === draggedTaskId ? { ...t, startTime: newStartTime } : t
      ));

      await fetch("/api/tasks", {
          method: "PATCH",
          body: JSON.stringify({
              taskId: draggedTaskId,
              startTime: newStartTime
          })
      });

      setDraggedTaskId(null);
  }


  function openAddModalAtTime(timeString: string) {
      setEditingId(null);
      setNewTask({
          title: "",
          description: "",
          priority: "LOW",
          isRecurring: false,
          date: format(selectedDate, "yyyy-MM-dd"),
          startTime: timeString,
          duration: "60",
          subtasks: []
      });
      setNewSubtask({ title: "", targetValue: "", unit: "" });
      setIsAdding(true);
  }


  const filteredTasks = tasks.filter(t => {
      if (activeTab === 'habits') return t.priority === "HABIT" || t.isRecurring;
      return t.priority !== "HABIT" && !t.isRecurring;
  });


  async function fetchTasks() {
    setLoading(true);
    try {
        const res = await fetch(`/api/tasks?date=${format(selectedDate, "yyyy-MM-dd")}`);
        const data = await res.json();
        if (data.success) setTasks(data.tasks);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }


  function openEditModal(task: any) {
      setEditingId(task.id);
      setNewTask({
          title: task.title,
          description: task.description || "",
          priority: task.priority,
          isRecurring: task.priority === "HABIT" || task.isRecurring,
          date: task.date ? format(new Date(task.date), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
          startTime: task.startTime ? format(new Date(task.startTime), "HH:mm") : "",
          duration: task.durationMins ? task.durationMins.toString() : "60",
          subtasks: task.subtasks || []
      });
      setIsAdding(true);
  }


  async function handleSaveTask() {
    let finalPriority = newTask.priority;
    if (!newTask.isRecurring && newTask.priority === "HABIT") {
        finalPriority = "LOW";
    } else if (newTask.isRecurring) {
        finalPriority = "HABIT";
    }

    const newSubtasksToAdd = newTask.subtasks.filter((st: any) => !st.id);
    const targetDateObj = new Date(newTask.date);
    const startTimeObj = newTask.startTime
        ? new Date(`${newTask.date}T${newTask.startTime}`)
        : null;

    const payload = {
        title: newTask.title,
        description: newTask.description,
        priority: finalPriority,
        isRecurring: newTask.isRecurring,

        date: targetDateObj,
        startTime: startTimeObj,
        duration: newTask.duration ? parseInt(newTask.duration) : 60,

        newSubtasks: newSubtasksToAdd,
        subtasks: newTask.subtasks
    };

    let res;
    if (editingId) {
        res = await fetch("/api/tasks", {
            method: "PATCH",
            body: JSON.stringify({ taskId: editingId, ...payload })
        });
    } else {
        res = await fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    }

    const data = await res.json();
    if (data.success) {
        setIsAdding(false);
        resetForm();
        fetchTasks();
    } else {
        alert(data.error || "Operation failed");
    }
  }


  function resetForm() {
      setNewTask({
          title: "",
          description: "",
          priority: "LOW",
          isRecurring: false,
          date: format(selectedDate, "yyyy-MM-dd"),
          startTime: "",
          duration: "60",
          subtasks: []
      });
      setNewSubtask({ title: "", targetValue: "", unit: "" });
      setEditingId(null);
  }



  async function toggleTask(id: string, currentStatus: boolean) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !currentStatus } : t));
    await fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify({ taskId: id, isCompleted: !currentStatus })
    });
  }


  async function toggleSubtask(taskId: string, subtaskId: string, currentStatus: boolean) {
     setTasks(prev => prev.map(t => {
         if (t.id !== taskId) return t;
         return {
             ...t,
             subtasks: t.subtasks.map((st: any) =>
                 st.id === subtaskId ? { ...st, isCompleted: !currentStatus } : st
             )
         };
     }));

     await fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify({ taskId, subtaskId, isCompleted: !currentStatus })
    });
  }


  async function updateSubtaskProgress(taskId: string, subtaskId: string, newValue: number) {
     setTasks(prev => prev.map(t => {
         if (t.id !== taskId) return t;
         return {
             ...t,
             subtasks: t.subtasks.map((st: any) =>
                 st.id === subtaskId ? { ...st, currentValue: newValue } : st
             )
         };
     }));

     await fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify({ taskId, subtaskId, subtaskValue: newValue })
    });
  }


  async function handleDeleteTask(taskId: string) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    setTasks(prev => prev.filter(t => t.id !== taskId));
    await fetch(`/api/tasks?id=${taskId}`, { method: "DELETE" });
  }

  const doneCount = filteredTasks.filter(t => t.isCompleted).length;
  const pct = filteredTasks.length ? Math.round((doneCount / filteredTasks.length) * 100) : 0;

  return (
    <PageShell>
        {loading && <DNALoader/>}

        <PageHeader
            eyebrow="Tasks"
            title={<>Plan the <em>day</em></>}
            description="Line up what matters, then give it a slot on the timeline."
            actions={
                <Button onClick={() => { resetForm(); setIsAdding(true); }}>
                    <Plus /> Add task
                </Button>
            }
        />

        {/* Toolbar: date navigation, filter, view switch. Scrolls sideways on phones. */}
        <div className="no-scrollbar -mx-4 mb-4 flex items-center gap-2 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            <div className="flex shrink-0 items-center gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Previous day"
                    onClick={() => setSelectedDate(subDays(selectedDate, 1))}
                >
                    <ChevronLeft />
                </Button>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="gap-2 tabular-nums">
                            <CalendarDays className="text-muted-foreground" />
                            <span className="sm:hidden">{format(selectedDate, "EEE, MMM d")}</span>
                            <span className="hidden sm:inline">{format(selectedDate, "EEEE, MMM do, yyyy")}</span>
                            <ChevronDown className="text-muted-foreground" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto rounded-3xl border-border p-2 shadow-float" align="start">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => date && setSelectedDate(date)}
                            initialFocus
                            captionLayout="dropdown-buttons"
                            fromYear={2024}
                            toYear={new Date().getFullYear() + 5}
                            className="border-0"
                        />
                    </PopoverContent>
                </Popover>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Next day"
                    onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                >
                    <ChevronRight />
                </Button>
            </div>

            {!isToday(selectedDate) && (
                <Button variant="ghost" onClick={() => setSelectedDate(new Date())}>
                    Today
                </Button>
            )}

            <Segmented
                className="shrink-0 lg:hidden"
                value={mobileView}
                onChange={setMobileView}
                options={[
                    { value: "list", label: "List" },
                    { value: "timeline", label: "Timeline" },
                ]}
            />

            <Segmented
                className="ml-auto shrink-0"
                value={activeTab}
                onChange={setActiveTab}
                options={[
                    { value: "tasks", label: "Tasks", icon: <AlignLeft /> },
                    { value: "habits", label: "Habits", icon: <Repeat /> },
                ]}
            />
        </div>

        <div className="grid items-start gap-3 md:gap-4 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
            {/* List */}
            <section
                className={cn(
                    "panel flex-col overflow-hidden lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7.5rem)]",
                    mobileView === "list" ? "flex" : "hidden lg:flex"
                )}
            >
                <header className="shrink-0 border-b border-border p-5 md:px-6">
                    <p className="label-mono">
                        {isToday(selectedDate) ? "Today" : format(selectedDate, "EEE, MMM d")}
                        {" · "}
                        {activeTab}
                    </p>
                    <p className="mt-2 text-lg font-medium tracking-[-0.02em]">
                        {loading
                            ? "Loading..."
                            : filteredTasks.length === 0
                                ? "Nothing scheduled"
                                : `${doneCount} of ${filteredTasks.length} done`}
                    </p>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface" aria-hidden="true">
                        <div
                            className="h-full rounded-full bg-foreground transition-[width] duration-700"
                            style={{ width: `${loading ? 0 : pct}%` }}
                        />
                    </div>
                </header>

                <div className="custom-scrollbar min-h-0 flex-1 lg:overflow-y-auto">
                    <TaskList
                        loading={loading}
                        tasks={filteredTasks}
                        activeTab={activeTab}
                        onDragStart={setDraggedTaskId}
                        onToggle={toggleTask}
                        onSubToggle={toggleSubtask}
                        onSubProgress={updateSubtaskProgress}
                        onDelete={handleDeleteTask}
                        onEdit={openEditModal}
                    />
                </div>
            </section>

            {/* Timeline */}
            <section
                className={cn(
                    "panel flex-col overflow-hidden",
                    mobileView === "timeline" ? "flex" : "hidden lg:flex"
                )}
            >
                <header className="flex items-end justify-between gap-4 border-b border-border p-5 md:px-6">
                    <div>
                        <p className="label-mono">Timeline</p>
                        <p className="mt-2 text-lg font-medium tracking-[-0.02em]">24 hours</p>
                    </div>
                    <p className="max-w-[16rem] text-right text-[13px] leading-snug text-muted-foreground">
                        <span className="lg:hidden">Tap an hour to add a task.</span>
                        <span className="hidden lg:inline">Click an hour to add a task, or drag one in from the list.</span>
                    </p>
                </header>
                <div className="pr-3 md:pr-5">
                    <TimelineView
                        tasks={filteredTasks}
                        loading={loading}
                        onTimeSlotClick={openAddModalAtTime}
                        onDropTask={handleDropTask}
                        draggedTaskId={draggedTaskId}
                        onEdit={openEditModal}
                    />
                </div>
            </section>
        </div>

        <AddTaskDialog
            isOpen={isAdding}
            onOpenChange={(open: boolean) => { setIsAdding(open); if(!open) resetForm(); }}
            task={newTask}
            setTask={setNewTask}
            subtask={newSubtask}
            setSubtask={setNewSubtask}
            onSave={handleSaveTask}
            isEditing={!!editingId}
        />
    </PageShell>
  );
}
