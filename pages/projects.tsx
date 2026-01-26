import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  const sample = [{ title: 'Projet A', description: 'Description courte', link: '#' }]

  return (
    <main className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-semibold text-white mb-6">Projets</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {sample.map((p) => (
          <ProjectCard key={p.title} title={p.title} description={p.description} href={p.link} />
        ))}
      </div>
    </main>
  )
}
