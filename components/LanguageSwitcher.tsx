import { useRouter } from 'next/router'
import Link from 'next/link'

export default function LanguageSwitcher() {
    const { locale, pathname, query, asPath } = useRouter()

    // Determine the next locale
    const nextLocale = locale === 'fr' ? 'en' : 'fr'
    const label = locale === 'fr' ? 'EN' : 'FR'

    return (
        <Link
            href={{ pathname, query }}
            as={asPath}
            locale={nextLocale}
            className="font-semibold text-text-muted hover:text-primary transition-colors text-sm border border-text-muted/20 rounded px-2 py-1"
        >
            {label}
        </Link>
    )
}
