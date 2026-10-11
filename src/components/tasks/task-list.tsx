"use client";

import { ListChecks, Repeat } from "lucide-react";
import { EmptyState } from "@/components/layout/page";
import { TaskCard } from "@/components/tasks/task-card";

/** Rows for the selected day. The surrounding panel is provided by the page. */
export function TaskList({ loading, tasks, activeTab, onDragStart, onToggle, onSubToggle, onSubProgress, onDelete, onEdit }: any) {
  if (loading) {
    return (
      <div className="divide-y divide-border" role="status" aria-label="Loading tasks">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-4 md:px-6">
            <span className="shimmer size-6 shrink-0 rounded-full bg-surface" />
            <div className="flex-1 space-y-2">
              <span className="shimmer block h-3.5 rounded-full bg-surface" style={{ width: `${68 - i * 9}%` }} />
              <span className="shimmer block h-3 w-24 rounded-full bg-surface" />
            </div>
          </div>
        ))}
        <span className="sr-only">Loading tasks...</span>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        className="border-0 py-12"
        icon={activeTab === "habits" ? <Repeat /> : <ListChecks />}
        title={`No ${activeTab} for this day.`}
        description={
          activeTab === "habits"
            ? "Mark a task as a daily habit and it will show up here every day."
            : "Add a task, or click an hour on the timeline to schedule one."
        }
      />
    );
  }

  return (
    <ul className="divide-y divide-border">
      {tasks.map((task: any) => (
        <li
          key={task.id}
          draggable
          onDragStart={() => onDragStart(task.id)}
          className="lg:cursor-grab lg:active:cursor-grabbing"
        >
          <TaskCard
            task={task}
            onToggle={onToggle}
            onSubToggle={onSubToggle}
            onSubProgress={onSubProgress}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </li>
      ))}
    </ul>
  );
}
