export const metadata = { title: "About — Civil Engineering Portal" };

export default function About() {
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">About the Department</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-primary">History</h2>
        <p className="text-gray-600">
          The Department of Civil Engineering has a long-standing tradition of
          excellence in engineering education and research, producing graduates
          who shape infrastructure across the nation.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-primary">Vision &amp; Mission</h2>
        <p className="text-gray-600">
          To be a leading centre for civil engineering education, advancing
          sustainable infrastructure through innovative research and producing
          competent, ethical engineers.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-primary">Head of Department</h2>
        <p className="text-gray-600">
          Prof. (Name) — leading the department with a focus on research
          excellence and student success.
        </p>
      </section>
    </div>
  );
}
