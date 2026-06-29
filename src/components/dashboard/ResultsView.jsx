"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";

export default function ResultsView() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/results")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setResults(d.results);
      })
      .catch((e) => {
        setError(e.message);
        setResults([]);
      });
  }, []);

  if (error) {
    return (
      <p className="rounded bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
        {error}
      </p>
    );
  }
  if (results === null) return <p className="text-gray-500 text-sm">Loading…</p>;
  if (results.length === 0) {
    return <p className="text-gray-500 text-sm">No results have been published yet.</p>;
  }

  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-4 py-3 font-medium">Course</th>
            <th className="px-4 py-3 font-medium">Session</th>
            <th className="px-4 py-3 font-medium">Semester</th>
            <th className="px-4 py-3 font-medium">Score</th>
            <th className="px-4 py-3 font-medium">Grade</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r._id} className="border-t border-gray-100">
              <td className="px-4 py-3">{r.course}</td>
              <td className="px-4 py-3">{r.session || "—"}</td>
              <td className="px-4 py-3 capitalize">{r.semester}</td>
              <td className="px-4 py-3">{r.score ?? "—"}</td>
              <td className="px-4 py-3 font-medium">{r.grade || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
