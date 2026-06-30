"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  {
    src: "/images/skyscraper-construction.jpg",
    title: "Structural Engineering",
    text: "Designing safe, resilient structures from the foundation up.",
  },
  {
    src: "/images/construction-site.jpg",
    title: "Design & Planning",
    text: "Turning concepts into precise engineering blueprints.",
  },
  {
    src: "/images/crane.jpg",
    title: "Construction Management",
    text: "Delivering projects on site — on time and to specification.",
  },
  {
    src: "/images/city-highway.jpg",
    title: "Transportation & Infrastructure",
    text: "Connecting communities through roads and networks.",
  },
  {
    src: "/images/modern-building.jpg",
    title: "The Built Environment",
    text: "Shaping skylines and the spaces where people live and work.",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), []);

  // Auto-advance; resets whenever the slide changes (manual nav included).
  useEffect(() => {
    const t = setTimeout(next, 5000);
    return () => clearTimeout(t);
  }, [index, next]);

  return (
    <div className="relative w-full h-[60vh] min-h-[360px] max-h-[560px] overflow-hidden rounded-xl shadow-sm">
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={s.src}
            alt={s.title}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow">{s.title}</h2>
            <p className="max-w-xl text-white/90 md:text-lg drop-shadow">{s.text}</p>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 text-white text-2xl flex items-center justify-center transition"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 text-white text-2xl flex items-center justify-center transition"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-secondary-light" : "w-2.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
