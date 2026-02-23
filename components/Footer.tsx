import { useTranslation } from 'next-i18next'

export default function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className="bg-card-bg mt-auto border-t border-text-muted/10">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-text-muted">
        © {new Date().getFullYear()} — Yann Miambanzila. {t('footer.rights')}
      </div>
    </footer>
  )
}
