import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-transparent pt-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/">
          <a className="font-bold text-2xl text-white tracking-wide">MonPortfolio</a>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/"><a className="text-text-muted hover:text-primary transition-colors">Accueil</a></Link>
          <Link href="/about"><a className="text-text-muted hover:text-primary transition-colors">À propos</a></Link>
          <Link href="/projects"><a className="text-text-muted hover:text-primary transition-colors">Projets</a></Link>
          <Link href="/contact"><a className="text-text-muted hover:text-primary transition-colors">Contact</a></Link>
        </nav>
      </div>
    </header>
  )
}
