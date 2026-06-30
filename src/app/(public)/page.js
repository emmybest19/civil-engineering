import Link from "next/link";
import Image from "next/image";
import Card from "@/components/Card";
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto space-y-16">
      {/* Carousel */}
      <Carousel />

      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Department of <span className="text-primary">Civil Engineering</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          The official portal for students, lecturers, and administration —
          announcements, results, directories, and more, all in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="px-6 py-3 bg-primary text-white rounded font-medium hover:bg-primary-dark transition"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border border-primary text-primary rounded font-medium hover:bg-primary hover:text-white transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-3">About the Department</h2>
          <p className="text-gray-600">
            The Civil Engineering Department focuses on cutting-edge research and
            quality education in structural, environmental, geotechnical, and
            transportation engineering. Our graduates go on to design and build
            the infrastructure that communities depend on.
          </p>
        </div>
        <div className="relative h-64 rounded-xl overflow-hidden shadow-sm">
          <Image
            src="/images/construction-site.jpg"
            alt="Engineer reviewing construction blueprints"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Stats */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Quick Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            ["10+", "Faculty Members"],
            ["500+", "Students"],
            ["50+", "Research Publications"],
          ].map(([value, label]) => (
            <Card key={label} className="text-center">
              <p className="text-3xl font-bold text-primary">{value}</p>
              <p className="text-gray-600">{label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h3 className="font-bold mb-1">Best Department Award 2025</h3>
            <p className="text-gray-600 text-sm">
              Recognized by the Engineering Council for excellence in curriculum.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold mb-1">New Research Grant</h3>
            <p className="text-gray-600 text-sm">
              $2M grant awarded for sustainable infrastructure research.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative rounded-xl overflow-hidden">
        <Image
          src="/images/city-highway.jpg"
          alt="City skyline and highway at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/80" />
        <div className="relative px-6 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Join the Civil Engineering Portal
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Access announcements, results, and the department directory in one place.
          </p>
          <Link
            href="/register"
            className="inline-block px-6 py-3 bg-secondary-light text-primary-dark rounded font-semibold hover:brightness-95 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
