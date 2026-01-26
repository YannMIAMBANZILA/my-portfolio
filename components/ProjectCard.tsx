type Props = {
  title: string
  description: string
  href?: string
}

export default function ProjectCard({ title, description, href }: Props) {
  return (
    <article className="border border-text-muted/10 rounded-lg p-6 bg-card-bg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
      <h2 className="font-bold text-xl text-white mb-2">{title}</h2>
      <p className="text-sm text-text-muted mb-4">{description}</p>
      {href ? (
        <a href={href} className="text-primary hover:text-orange-400 font-medium inline-flex items-center">
          Voir le projet &rarr;
        </a>
      ) : null}
    </article>
  )
}
