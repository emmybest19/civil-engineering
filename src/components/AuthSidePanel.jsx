import Image from "next/image";
import Link from "next/link";

// "Smart content" panel shown beside the auth forms. Hidden on small screens.
export default function AuthSidePanel({ image, heading, subheading, points = [] }) {
  return (
    <div className="relative hidden md:flex overflow-hidden">
      <Image src={image} alt="" fill sizes="50vw" className="object-cover" priority />
      <div className="absolute inset-0 bg-primary-dark/85" />

      <div className="relative z-10 flex flex-col justify-between p-10 lg:p-14 text-white w-full">
        <Link href="/" className="text-xl font-bold flex items-center gap-2 w-fit">
          <span className="text-secondary-light">CE</span>
          <span>Portal</span>
        </Link>

        <div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">{heading}</h2>
          <p className="text-white/85 mb-8 max-w-sm">{subheading}</p>
          <ul className="space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary-light text-primary-dark text-xs font-bold">
                  ✓
                </span>
                <span className="text-white/90">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-white/60 text-sm">Department of Civil Engineering</p>
      </div>
    </div>
  );
}
