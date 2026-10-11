"use client";

import { useState, useEffect } from "react";
import { Plus, Clock, CheckCircle, LayoutGrid, List, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddDeadlineDialog } from "@/components/deadlines/add-deadline-dialog";
import { DeadlineCard } from "@/components/deadlines/deadline-card";
import { getDeadlines } from "@/app/actions/deadlines";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import { PageShell, PageHeader, EmptyState, Segmented } from "@/components/layout/page";
import { cn } from "@/lib/utils";

export default function DeadlinesPage() {
  const [activeTab, setActiveTab] = useState("running");
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Layout preference (persisted in localStorage)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isMounted, setIsMounted] = useState(false); // Prevents hydration mismatch

  useEffect(() => {
    // Load the saved preference on mount
    const savedView = localStorage.getItem("deadlineViewMode");
    if (savedView === "grid" || savedView === "list") {
      setViewMode(savedView);
    }
    setIsMounted(true);
    loadData();
  }, []);

  async function loadData() {
    const res = await getDeadlines();
    if (res.success) setDeadlines(res.data);
    setLoading(false);
  }

  // Save the preference when the user switches view
  const handleViewChange = (mode: "list" | "grid") => {
    setViewMode(mode);
    localStorage.setItem("deadlineViewMode", mode);
  };

  const now = new Date();

  const running = deadlines.filter(d => {
    if (d.isCompleted) return false;
    if (!d.targetDate) return true;
    return new Date(d.targetDate) > now;
  });

  const history = deadlines.filter(d => {
    if (d.isCompleted) return true;
    if (d.targetDate && new Date(d.targetDate) <= now) return true;
    return false;
  });

  // The single most urgent active deadline gets the lime panel.
  const mostUrgentId = running
    .filter(d => d.targetDate)
    .sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime())[0]?.id;

  const layoutClasses = viewMode === "list"
    ? "flex flex-col gap-3 md:gap-4"
    : "grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4";

  // Don't render layout until client side is ready to prevent hydration flashes
  if (!isMounted) return null;

  const items = activeTab === "running" ? running : history;

  return (
    <PageShell>
      {loading && <DNALoader />}

      <PageHeader
        eyebrow="Deadlines"
        title={<>Against the <em>clock</em></>}
        description="Every project with a date, counted down to the second."
        actions={
          <Button onClick={() => setIsDialogOpen(true)} className="w-full sm:w-auto">
            <Plus /> New deadline
          </Button>
        }
      />

      <div className="mb-4 flex items-center justify-between gap-3 md:mb-5">
        <Segmented
          value={activeTab}
          onChange={setActiveTab}
          options={[
            { value: "running", label: `Active · ${running.length}`, icon: <Clock /> },
            { value: "history", label: `Past & done · ${history.length}`, icon: <CheckCircle /> },
          ]}
        />

        {/* Grid and list only differ from `md` up */}
        <Segmented
          className="hidden md:inline-flex"
          value={viewMode}
          onChange={handleViewChange}
          options={[
            { value: "list", label: "List", icon: <List /> },
            { value: "grid", label: "Grid", icon: <LayoutGrid /> },
          ]}
        />
      </div>

      {!loading && items.length === 0 ? (
        activeTab === "running" ? (
          <EmptyState
            icon={<Timer />}
            title="Nothing on the clock."
            description="Add a deadline to start a countdown and break the work into steps."
            action={
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus /> New deadline
              </Button>
            }
          />
        ) : (
          <EmptyState
            icon={<CheckCircle />}
            title="No past deadlines yet."
            description="Completed and expired deadlines are kept here."
          />
        )
      ) : (
        <div className={cn(layoutClasses, "animate-fade-in")} key={activeTab}>
          {items.map(item => (
            <div
              key={item.id}
              className={cn(
                "min-w-0",
                viewMode === "grid" && activeTab === "running" && item.id === mostUrgentId && "md:col-span-2"
              )}
            >
              <DeadlineCard
                data={item}
                onUpdate={loadData}
                isHistory={activeTab === "history" ? true : undefined}
                featured={activeTab === "running" && item.id === mostUrgentId}
              />
            </div>
          ))}
        </div>
      )}

      <AddDeadlineDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSave={loadData} />
    </PageShell>
  );
}
