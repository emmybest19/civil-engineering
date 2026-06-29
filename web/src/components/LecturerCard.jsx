export default function LecturerCard({ lecturer, onClick }) {
  return (
    <button
      type="button"
      className="text-left border border-gray-200 rounded-lg shadow-sm p-4 bg-white cursor-pointer hover:shadow-md transition w-full"
      onClick={() => onClick && onClick(lecturer)}
    >
      <img
        src={lecturer.image || "/placeholder-avatar.svg"}
        alt={lecturer.name}
        className="w-24 h-24 object-cover rounded-full mx-auto mb-4 bg-gray-100"
      />
      <h3 className="text-lg font-bold text-center">{lecturer.name}</h3>
      <p className="text-center text-sm text-gray-600">{lecturer.position}</p>
    </button>
  );
}
