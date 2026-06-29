export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} Department of Civil Engineering. All rights reserved.
      </p>
    </footer>
  );
}
