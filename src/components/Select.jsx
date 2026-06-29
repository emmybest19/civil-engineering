// Styled wrapper around a native <select>: custom border, focus ring, and a
// custom chevron (the native arrow is hidden with appearance-none).
export default function Select({ className = "", children, ...props }) {
  return (
    <div className={`relative ${className}`}>
      <select
        {...props}
        className="w-full appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-9 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:bg-gray-50 disabled:cursor-not-allowed"
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
