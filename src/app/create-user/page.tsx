// src/app/create-user/page.tsx
"use client";
import { useState } from "react";

export default function CreateUserPage() {
  const [form, setForm] = useState({
    email: "",
    nationality: "Indian",
    height: "170",
    weight: "70"
  });
  const [createdUser, setCreatedUser] = useState<any>(null);

  async function handleCreate() {
    const res = await fetch("/api/create-user", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      setCreatedUser(data.user);
    } else {
      alert("Error: " + data.details);
    }
  }

  return (
    <div className="p-10 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Create Test User 👤</h1>
      
      <div className="space-y-4">
        <input 
          className="w-full p-2 border rounded" 
          placeholder="Email (e.g. user1@soma.app)" 
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <input 
          className="w-full p-2 border rounded" 
          placeholder="Nationality" 
          value={form.nationality}
          onChange={(e) => setForm({...form, nationality: e.target.value})}
        />
        <div className="flex gap-4">
          <input 
            className="w-1/2 p-2 border rounded" 
            placeholder="Height (cm)" 
            value={form.height}
            onChange={(e) => setForm({...form, height: e.target.value})}
          />
          <input 
            className="w-1/2 p-2 border rounded" 
            placeholder="Weight (kg)" 
            value={form.weight}
            onChange={(e) => setForm({...form, weight: e.target.value})}
          />
        </div>
        
        <button 
          onClick={handleCreate}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create User
        </button>
      </div>

      {createdUser && (
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-green-800 font-bold">User Created Successfully! 🎉</p>
          <p className="mt-2 text-sm text-gray-600">Copy this ID for the test lab:</p>
          <div className="bg-white p-2 border mt-1 font-mono text-lg select-all">
            {createdUser.id}
          </div>
        </div>
      )}
    </div>
  );
}