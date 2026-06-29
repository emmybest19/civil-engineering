export default function Button({ children, className = "", variant = "primary", ...props }) {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary/50",
    secondary: "bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50",
  };

  return (
    <button
      className={`px-4 py-2 rounded font-medium transition focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
