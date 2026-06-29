"use client";

import { useEffect, useState } from "react";
import LecturerCard from "@/components/LecturerCard";
import LecturerModal from "@/components/LecturerModal";

export default function LecturerDirectory() {
  const [lecturers, setLecturers] = useState(null);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/lecturers")
      .then((r) => r.json())
      .then((d) => setLecturers(d.lecturers || []))
      .catch(() => setLecturers([]));
  }, []);

  if (lecturers === null) return <p className="text-gray-500 text-sm">Loading…</p>;
  if (lecturers.length === 0) {
    return <p className="text-gray-500 text-sm">No lecturers have been added yet.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lecturers.map((lec) => (
          <LecturerCard
            key={lec._id}
            lecturer={lec}
            onClick={(l) => {
              setSelected(l);
              setOpen(true);
            }}
          />
        ))}
      </div>
      <LecturerModal lecturer={selected} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
