import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'next-i18next'

export default function Header() {
  const { t } = useTranslation('common')

  return (
    <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-text-muted/10 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="#home" className="font-bold text-2xl text-text-main tracking-wide">
          Yann M.
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex space-x-8">
            <Link href="#home" className="text-text-muted hover:text-primary transition-colors">{t('nav.home')}</Link>
            <Link href="#about" className="text-text-muted hover:text-primary transition-colors">{t('nav.about')}</Link>
            <Link href="#skills" className="text-text-muted hover:text-primary transition-colors">{t('nav.skills')}</Link>
            <Link href="#projects" className="text-text-muted hover:text-primary transition-colors">{t('nav.projects')}</Link>
            <Link href="#contact" className="text-text-muted hover:text-primary transition-colors">{t('nav.contact')}</Link>
          </nav>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
