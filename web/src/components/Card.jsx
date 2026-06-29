export default function Card({ children, className = "" }) {
  return (
    <div className={`border border-gray-200 rounded-lg shadow-sm p-4 bg-white ${className}`}>
      {children}
    </div>
  );
}
