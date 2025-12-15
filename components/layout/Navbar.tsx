import Link from "next/link"
import { ModeToggle } from "@/components/theme/ThemeToggle"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/75 dark:bg-slate-950/75 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Nom */}
        <Link href="/" className="font-bold text-xl tracking-tight">
          Mon<span className="text-primary">Portfolio</span>
        </Link>

        {/* Liens de navigation (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#about" className="hover:text-primary transition-colors">À propos</Link>
          <Link href="#projects" className="hover:text-primary transition-colors">Projets</Link>
          <Link href="#skills" className="hover:text-primary transition-colors">Compétences</Link>
          <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>

        {/* Bouton Dark Mode + Placeholder pour menu mobile plus tard */}
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}