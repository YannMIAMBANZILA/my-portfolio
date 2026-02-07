import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-transparent pt-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl text-white tracking-wide">
          MonPortfolio
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-text-muted hover:text-primary transition-colors">Accueil</Link>
          <Link href="/about" className="text-text-muted hover:text-primary transition-colors">À propos</Link>
          <Link href="/projects" className="text-text-muted hover:text-primary transition-colors">Projets</Link>
          <Link href="/contact" className="text-text-muted hover:text-primary transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
