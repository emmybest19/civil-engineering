"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import LevelFilter from "@/components/LevelFilter";

const levels = ["100", "200", "300", "400", "500"];

export default function StudentsList({ canManage = false }) {
  const [students, setStudents] = useState(null);
  const [level, setLevel] = useState("");

  async function load() {
    const res = await fetch("/api/students");
    const data = await res.json();
    if (res.ok) setStudents(data.students);
    else setStudents([]);
  }

  useEffect(() => {
    fetch("/api/students")
      .then((r) => r.json())
      .then((d) => setStudents(d.students || []))
      .catch(() => setStudents([]));
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this student account?")) return;
    const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  if (students === null) return <p className="text-gray-500 text-sm">Loading…</p>;

  const filtered = level ? students.filter((s) => s.level === level) : students;

  return (
    <div className="space-y-4">
      <LevelFilter levels={levels} selected={level} onChange={setLevel} />
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">No students found.</p>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Matric</th>
                <th className="px-4 py-3 font-medium">Level</th>
                <th className="px-4 py-3 font-medium">Email</th>
                {canManage && <th className="px-4 py-3"></th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s._id} className="border-t border-gray-100">
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">{s.matricNumber || "—"}</td>
                  <td className="px-4 py-3">{s.level || "—"}</td>
                  <td className="px-4 py-3">{s.email}</td>
                  {canManage && (
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => handleDelete(s._id)} className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
