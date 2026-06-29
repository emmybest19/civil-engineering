export default function LevelFilter({ levels, selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        className={`px-3 py-1 rounded-full border text-sm transition ${
          selected === "" ? "bg-primary text-white border-primary" : "bg-white border-gray-300"
        }`}
        onClick={() => onChange("")}
      >
        All
      </button>
      {levels.map((lvl) => (
        <button
          key={lvl}
          className={`px-3 py-1 rounded-full border text-sm transition ${
            selected === lvl ? "bg-primary text-white border-primary" : "bg-white border-gray-300"
          }`}
          onClick={() => onChange(lvl)}
        >
          {lvl} Level
        </button>
      ))}
    </div>
  );
}
