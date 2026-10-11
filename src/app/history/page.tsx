"use client";

import { useEffect, useState, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { Calendar as CalendarIcon, LayoutGrid, List, Plus } from "lucide-react";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import { Button } from "@/components/ui/button";
import { PageShell, PageHeader, EmptyState, Segmented } from "@/components/layout/page";
import { AddLogDialog } from "@/components/history/add-log-dialog";
import { HistoryTaskList } from "@/components/history/history-task-list";
import { HistoryTimeline } from "@/components/history/history-timeline";
import { HistoryLogEntry } from "@/components/history/log-entry";
import { DayNavigator } from "@/components/history/day-navigator";
import { DaySummary } from "@/components/history/day-summary";
import { ConfirmSheet } from "@/components/history/confirm-sheet";
import { toast } from "sonner";
import { AddTaskDialog } from "@/components/tasks/add-task-dialog";
import { getDailySteps } from "@/app/actions/steps";

export default function HistoryPage() {
  const { user, isLoaded } = useUser();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

// MODAL STATES
  const [simpleModal, setSimpleModal] = useState<{ title: string; msg: string; isError?: boolean } | null>(null);
  const [logToDelete, setLogToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  //   Track which tab is open so the button knows what to do
  const [activeTab, setActiveTab] = useState("diet");

  // Task specific states
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

// NEW: ADD LOG STATE
  const [isAdding, setIsAdding] = useState(false);
  const [newLogText, setNewLogText] = useState("");
  const [isSavingLog, setIsSavingLog] = useState(false);

  // Inside HistoryPage component, near other state variables
  const [tasks, setTasks] = useState<any[]>([]); // NEW: Store history tasks
  const [newSubtask, setNewSubtask] = useState({ title: "", targetValue: "", unit: "" });
  const [dailySteps, setDailySteps] = useState(0);

  const [newTask, setNewTask] = useState({
      title: "",
      description: "",
      priority: "MEDIUM",
      isRecurring: false,
      date: format(new Date(), "yyyy-MM-dd"), // Default date
      startTime: "",
      duration: "60",
      subtasks: [] as any[]
  });

  // 1. New State for Layout Preference
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isMounted, setIsMounted] = useState(false);

  // 2. Load saved preference on mount
  useEffect(() => {
    const savedView = localStorage.getItem("dietViewMode");
    if (savedView === "grid" || savedView === "list") {
      setViewMode(savedView);
    }
    setIsMounted(true);
  }, []);

  // 3. Handle saving the preference
  const handleViewChange = (mode: "list" | "grid") => {
    setViewMode(mode);
    localStorage.setItem("dietViewMode", mode);
  };


async function handleAddTask() {
  // Check against full object title
  if (!newTask.title.trim() || !date || !user) return;

  try {
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        ...newTask, // Spread all fields (description, priority, etc.)
        userId: user.id,
        // Override date with the history page's selected date context
        date: format(date, "yyyy-MM-dd"),
        isCompleted: false
      })
    });

    if (res.ok) {
        toast.success("Task added to history");
        // Reset form
        setNewTask({
            title: "", description: "", priority: "MEDIUM", isRecurring: false,
            date: format(date, "yyyy-MM-dd"), startTime: "", duration: "60", subtasks: []
        });
        setIsAddingTask(false);
        fetchTasks();
    }
  } catch (e) {
    console.error(e);
  }
}
// 2. Delete a Task
async function confirmDeleteTask() {
    if (!taskToDelete) return;
    setIsDeleting(true);
    try {
        await fetch(`/api/tasks?taskId=${taskToDelete}`, { method: "DELETE" });
        setTasks(prev => prev.filter(t => t.id !== taskToDelete));
        toast.success("Task deleted");
    } catch (e) {
        toast.error("Could not delete task");
    } finally {
        setIsDeleting(false);
        setTaskToDelete(null);
    }
}

  const filteredHistoryTasks = useMemo(() => {
    if (!date) return [];
    const target = format(date, "yyyy-MM-dd");

    return tasks.filter(t =>
        format(new Date(t.date), "yyyy-MM-dd") === target
    );
    }, [tasks, date]);



  useEffect(() => {
      if (!isLoaded || !user) return;

      setLoading(true);
      // CHANGED: Fetch both in parallel
      Promise.all([fetchLogs(), fetchTasks()]).finally(() => setLoading(false));
  }, [isLoaded, user, date]); // Added 'date' to dependencies so it refetches on change

  // NEW: Helper function to fetch tasks
  async function fetchTasks() {
      try {
          if(!date) return;
          // Reusing your existing Tasks API!
          const res = await fetch(`/api/tasks?date=${format(date, "yyyy-MM-dd")}`);
          const data = await res.json();
          if (data.success) setTasks(data.tasks);
      } catch (e) { console.error("Failed to fetch tasks", e); }
  }

  // NEW: Handle toggling tasks from history
  async function toggleTaskHistory(taskId: string, currentStatus: boolean) {
    // 1. Optimistic Update (Update UI instantly)
    setTasks(prev => prev.map(t =>
        t.id === taskId ? { ...t, isCompleted: !currentStatus } : t
    ));

    // 2. Sync with Database
    try {
        await fetch("/api/tasks", {
            method: "PATCH",
            body: JSON.stringify({ taskId, isCompleted: !currentStatus })
        });
    } catch (e) {
        console.error("Failed to update task", e);
    }
  }

async function fetchLogs() {
    try {
      // FIX: Define a start date far in the past (e.g., Jan 1, 2024)
      // This ensures the API returns ALL your history, not just the last 14 days.
      const fromDate = new Date("2024-01-01").toISOString();
      const toDate = new Date().toISOString(); // Today

      // Pass 'from' and 'to' to bypass the "take: 14" limit on the server
      const res = await fetch(`/api/get-logs?userId=${user?.id}&from=${fromDate}&to=${toDate}`);

      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      }
    } catch (error) {
      console.error("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  }

  // NEW: Helper to fetch steps
  async function fetchSteps() {
    if (!date) return;
    try {
        // We pass the specific date to your server action
        // Note: You might need to update getDailySteps to accept a date parameter if it doesn't already
        // If your getDailySteps only gets "today", you might need to tweak it or use an API route.
        // Assuming getDailySteps handles the date logic or we pass it:
        const res = await getDailySteps(date);
        setDailySteps(res.steps);
    } catch (e) {
        console.error("Failed to fetch steps");
    }
  }

  useEffect(() => {
      if (!isLoaded || !user) return;

      setLoading(true);
      // CHANGED: Add fetchSteps to the parallel execution
      Promise.all([fetchLogs(), fetchTasks(), fetchSteps()]).finally(() => setLoading(false));
  }, [isLoaded, user, date]);



  // NEW COMPONENT: Handles Expand/Collapse Logic


  // NEW: HANDLE ADD LOG (BACKFILL)
  async function handleAddLog() {

    // ADD 'user' to this check
    if (!newLogText.trim() || !date || !user) {
        return;
    }

    setIsSavingLog(true);
    try {
        const res = await fetch("/api/process-log", {
            method: "POST",
            body: JSON.stringify({
                userText: newLogText,
                userId: user.id,
                date: date.toISOString() // IMPORTANT: Sends the selected calendar date
            })
        });

        const data = await res.json();

        if (data.success) {
            toast.success("Entry added successfully!");
            setNewLogText("");
            setIsAdding(false);
            fetchLogs(); // Refresh list to show the new card immediately
        } else {
            toast.error(data.error || "Processing Failed", {
                description: data.details
            });
        }
    } catch (e) {
        toast.error("Connection Error"); // Changed
    } finally {
        setIsSavingLog(false);
    }
  }

  // 1. OPEN CONFIRM MODAL
    function askToDelete(logId: string) {
      setLogToDelete(logId);
    }

  // 2. CONFIRM DELETE
    async function confirmDelete() {
      if (!logToDelete) return;
      setIsDeleting(true);
      try {
        const res = await fetch(`/api/delete-log?id=${logToDelete}&userId=${user?.id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (data.success) {
          setLogs((prev) => prev.filter((log) => log.id !== logToDelete));
          setLogToDelete(null);
          toast.success("Record removed successfully");
        } else {
          setLogToDelete(null);
          toast.error("Failed to delete log");
        }
      } catch (error) {
          setLogToDelete(null);
          setSimpleModal({ title: "Error", msg: "Server error.", isError: true });
      } finally {
        setIsDeleting(false);
      }
    }

  // 3. MIDNIGHT FIX (Normalizes dates so blue dots show up)
    const daysWithHistory = logs.map(log => {
      const d = new Date(log.date);
      d.setHours(0, 0, 0, 0);
      return d;
    });

  // Filter logs for the selected date
  const filteredLogs = logs.filter((log) => {
    if (!date) return false;
    const logDate = new Date(log.date).toDateString();
    const selectedDate = date.toDateString();
    return logDate === selectedDate;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort Morning -> Night

if (!isLoaded || loading || !isMounted) return <DNALoader />;

  // Helper: Check if selected date is in the future
  const isFutureDate = date ? date > new Date() : false;

  return (
    <PageShell>
      <PageHeader
        eyebrow={date ? format(date, "EEEE, MMMM do") : "Select a date"}
        title={
          <>
            Look back at <em>any day</em>
          </>
        }
        description="Review what you ate, how you moved and what you got done."
        actions={
          date && !isFutureDate && activeTab !== "timeline" ? (
            <Button onClick={() => (activeTab === "tasks" ? setIsAddingTask(true) : setIsAdding(true))}>
              <Plus />
              {activeTab === "tasks" ? "Add task" : "Add log"}
            </Button>
          ) : undefined
        }
      />

      <div className="space-y-3 md:space-y-4">
        {/* Toolbar: day navigator + section switch. Two rows on phones, each scrolls sideways if it cannot fit. */}
        <div className="no-scrollbar -mx-4 flex flex-col gap-3 overflow-x-auto px-4 sm:mx-0 sm:flex-row sm:items-center sm:justify-between sm:px-0">
          <DayNavigator date={date} onChange={setDate} daysWithHistory={daysWithHistory} />
          <Segmented
            className="w-full shrink-0 sm:w-auto [&>button]:flex-1 [&>button]:justify-center"
            value={activeTab}
            onChange={(val) => setActiveTab(val)}
            options={[
              { value: "diet", label: "Diet" },
              { value: "tasks", label: "Tasks" },
              { value: "timeline", label: "Timeline" },
            ]}
          />
        </div>

        <DaySummary logs={filteredLogs} steps={dailySteps} />

        {activeTab === "diet" && (
          <div className="animate-fade-in">
            {filteredLogs.length === 0 ? (
              <EmptyState
                icon={<CalendarIcon />}
                title="No activity recorded."
                description="Nothing was logged on this day."
              />
            ) : (
              <div className="space-y-3">
                <div className="flex min-h-10 items-center justify-between gap-3 pt-2">
                  <p className="label-mono">
                    {filteredLogs.length} {filteredLogs.length === 1 ? "entry" : "entries"}
                  </p>
                  {/* Layout preference, from md up (phones are always single column) */}
                  <Segmented
                    className="hidden md:inline-flex"
                    size="sm"
                    value={viewMode}
                    onChange={handleViewChange}
                    options={[
                      { value: "list", label: "List", icon: <List /> },
                      { value: "grid", label: "Grid", icon: <LayoutGrid /> },
                    ]}
                  />
                </div>

                {viewMode === "list" ? (
                  <div className="panel divide-y divide-border overflow-hidden">
                    {filteredLogs.map((log) => (
                      <HistoryLogEntry key={log.id} log={log} onDelete={(id) => setLogToDelete(id)} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 md:gap-4">
                    {filteredLogs.map((log) => (
                      <HistoryLogEntry key={log.id} log={log} onDelete={(id) => setLogToDelete(id)} framed />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="animate-fade-in">
            <HistoryTaskList
              tasks={filteredHistoryTasks}
              onToggle={toggleTaskHistory}
              onDelete={(id) => setTaskToDelete(id)}
            />
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="animate-fade-in">
            <HistoryTimeline tasks={tasks} />
          </div>
        )}
      </div>

      {/* ---------- Dialogs ---------- */}
      <AddLogDialog
        isOpen={isAdding}
        onOpenChange={setIsAdding}
        date={date}
        text={newLogText}
        onTextChange={setNewLogText}
        onSave={handleAddLog}
        isSaving={isSavingLog}
      />

      {logToDelete && (
        <ConfirmSheet
          title="Delete record?"
          description="This cannot be undone."
          confirmLabel="Delete"
          busy={isDeleting}
          onCancel={() => setLogToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}

      <AddTaskDialog
        isOpen={isAddingTask}
        onOpenChange={setIsAddingTask}
        task={newTask}
        setTask={setNewTask}
        subtask={newSubtask}
        setSubtask={setNewSubtask}
        onSave={handleAddTask}
        isEditing={false}
      />

      {taskToDelete && (
        <ConfirmSheet
          title="Delete task?"
          description="This action cannot be undone."
          confirmLabel="Yes, delete"
          busy={isDeleting}
          onCancel={() => setTaskToDelete(null)}
          onConfirm={confirmDeleteTask}
        />
      )}
    </PageShell>
  );
}
