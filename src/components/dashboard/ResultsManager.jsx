"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Select from "@/components/Select";

const emptyForm = {
  student: "",
  course: "",
  session: "",
  semester: "first",
  score: "",
  grade: "",
};

export default function ResultsManager() {
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadStudents() {
    const res = await fetch("/api/students");
    const data = await res.json();
    if (res.ok) setStudents(data.students);
  }

  async function loadResults() {
    const res = await fetch("/api/results");
    const data = await res.json();
    if (res.ok) setResults(data.results);
  }

  useEffect(() => {
    fetch("/api/students")
      .then((r) => r.json())
      .then((d) => {
        if (d.students) setStudents(d.students);
      })
      .catch(() => {});
    fetch("/api/results")
      .then((r) => r.json())
      .then((d) => {
        if (d.results) setResults(d.results);
      })
      .catch(() => {});
  }, []);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload.");
      setForm(emptyForm);
      loadResults();
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this result?")) return;
    const res = await fetch(`/api/results/${id}`, { method: "DELETE" });
    if (res.ok) loadResults();
  }

  const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-semibold mb-3">Upload a result</h2>
        {students.length === 0 ? (
          <p className="text-sm text-gray-500">
            No student accounts yet. Students need to register before you can record results.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select name="student" required value={form.student} onChange={update}>
              <option value="">Select student…</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} {s.matricNumber ? `(${s.matricNumber})` : ""}
                </option>
              ))}
            </Select>
            <input name="course" required placeholder="Course (e.g. CVE 301)" value={form.course} onChange={update} className={inputClass} />
            <input name="session" placeholder="Session (e.g. 2024/2025)" value={form.session} onChange={update} className={inputClass} />
            <Select name="semester" value={form.semester} onChange={update}>
              <option value="first">First semester</option>
              <option value="second">Second semester</option>
            </Select>
            <input name="score" type="number" min="0" max="100" placeholder="Score (0–100)" value={form.score} onChange={update} className={inputClass} />
            <input name="grade" placeholder="Grade (e.g. A)" value={form.grade} onChange={update} className={inputClass} />
            <div className="sm:col-span-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving…" : "Save result"}
              </Button>
            </div>
          </form>
        )}
        {error && (
          <p className="mt-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
            {error}
          </p>
        )}
      </Card>

      <div>
        <h2 className="font-semibold mb-3">Recorded results</h2>
        {results.length === 0 ? (
          <p className="text-gray-500 text-sm">No results recorded yet.</p>
        ) : (
          <Card className="overflow-x-auto p-0">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Student</th>
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Grade</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r._id} className="border-t border-gray-100">
                    <td className="px-4 py-3">{r.student?.name || "—"}</td>
                    <td className="px-4 py-3">{r.course}</td>
                    <td className="px-4 py-3">{r.score ?? "—"}</td>
                    <td className="px-4 py-3 font-medium">{r.grade || "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => handleDelete(r._id)} className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </div>
  );
}
