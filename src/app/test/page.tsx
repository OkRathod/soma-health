"use client";

import { useState } from "react";

export default function TestPage() {
  const [log, setLog] = useState("");
  const [userId, setUserId] = useState(""); 
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/process-log", {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          userText: log,
          userTimezone: "Asia/Kolkata",
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Error sending log");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Soma AI Test Lab 🧪</h1>
      
      <div className="space-y-2">
        <label className="block font-medium">User ID (Paste from Supabase)</label>
        <input 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g. 550e8400-..."
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Your Log</label>
        <textarea 
          value={log} 
          onChange={(e) => setLog(e.target.value)}
          className="w-full p-2 border rounded h-32"
          placeholder="Example: I ate 2 paneer parathas and did 20 squats."
        />
      </div>

      <button 
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-2 bg-slate-900 text-white rounded hover:bg-slate-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Analyze Log"}
      </button>

      {result && (
        <div className="p-4 bg-slate-100 rounded border mt-6">
          <h3 className="font-bold mb-2">AI Response:</h3>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}