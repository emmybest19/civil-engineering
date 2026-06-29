export default function StudentCard({ student }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white">
      <h3 className="text-lg font-bold">{student.name}</h3>
      <p className="text-sm text-gray-600">Matric: {student.matric}</p>
      <p className="text-sm text-gray-600">Level: {student.level}</p>
    </div>
  );
}
