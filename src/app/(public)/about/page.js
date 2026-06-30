import Image from "next/image";

export const metadata = { title: "About — Civil Engineering Portal" };

export default function About() {
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto space-y-10">
      {/* Banner */}
      <div className="relative h-56 md:h-72 rounded-xl overflow-hidden shadow-sm">
        <Image
          src="/images/modern-building.jpg"
          alt="Modern high-rise buildings"
          fill
          priority
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
            About the Department
          </h1>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-primary">History</h2>
        <p className="text-gray-600">
          The Department of Civil Engineering has a long-standing tradition of
          excellence in engineering education and research, producing graduates
          who shape infrastructure across the nation.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-primary">Vision &amp; Mission</h2>
          <p className="text-gray-600">
            To be a leading centre for civil engineering education, advancing
            sustainable infrastructure through innovative research and producing
            competent, ethical engineers.
          </p>
        </div>
        <div className="relative h-48 rounded-xl overflow-hidden shadow-sm">
          <Image
            src="/images/skyscraper-construction.jpg"
            alt="Engineers on a construction site"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-primary">Head of Department</h2>
        <p className="text-gray-600">
          Prof Mrs Ekpenyong Benerdine — leading the department with a focus on research
          excellence and student success.
        </p>
      </section>
    </div>
  );
}
