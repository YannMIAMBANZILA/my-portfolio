"use client"

import * as React from "react"
import { Home, User, BookOpen, Phone, Sun, Moon, Menu, X } from "lucide-react"

export interface NavSection {
  id: number
  title: string
  subtitle?: string
}

interface FloatingNavbarProps {
  sections: NavSection[]
  activeSection: number
  onSelectSection: (index: number) => void
  lang: "FR" | "EN"
  onToggleLang: () => void
  isDark: boolean
  onToggleTheme: () => void
  className?: string
}

const SECTION_ICONS = [
  { id: 1, color: "#0284c7", Icon: Home },
  { id: 2, color: "#16a34a", Icon: User },
  { id: 3, color: "#d97706", Icon: BookOpen },
  { id: 4, color: "#2563eb", Icon: Phone },
]

export function FloatingNavbar({
  sections,
  activeSection,
  onSelectSection,
  lang,
  onToggleLang,
  isDark,
  onToggleTheme,
  className = "",
}: FloatingNavbarProps) {
  const [open, setOpen] = React.useState(false)
  const burgerRef = React.useRef<HTMLDivElement>(null)

  // Fermeture automatique au clic / touch extérieur
  React.useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (burgerRef.current && !burgerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [open])

  return (
    <header
      className={`select-none pointer-events-auto w-[calc(100%-24px)] max-w-[420px] md:w-auto md:max-w-none ${className}`}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: isDark ? "rgba(255, 255, 255, 0.88)" : "rgba(255, 255, 255, 0.82)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1.5px solid rgba(255, 255, 255, 0.95)",
          borderRadius: "9999px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
        className="w-full md:w-auto justify-between md:justify-start px-2.5 py-1.5 md:px-4 md:py-2 gap-2 md:gap-3 min-h-[52px] md:min-h-0"
      >
        {/* Logo Monogramme */}
        <button
          type="button"
          onClick={() => onSelectSection(0)}
          className="flex items-center gap-1.5 bg-transparent border-0 cursor-pointer px-1 py-1 outline-none shrink-0"
          aria-label="Retour à l'accueil"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <span className="font-sans font-black text-sm tracking-wider text-slate-900">
            YM<span className="logo-text-desktop text-slate-500 font-medium">.DEV</span>
          </span>
        </button>

        {/* Séparateur */}
        <div className="w-[1px] h-[22px] bg-black/10 shrink-0 mx-0.5" />

        {/* 1. Version Mobile (< md) : 4 ronds confortables (38px) */}
        <nav aria-label="Navigation mobile" className="nav-mobile-view items-center gap-2">
          {sections.map((section, index) => {
            const isActive = activeSection === index
            const config = SECTION_ICONS[index] || SECTION_ICONS[0]
            const Icon = config.Icon

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSelectSection(index)}
                aria-label={section.title}
                style={{
                  borderColor: isActive ? config.color : "rgba(0, 0, 0, 0.12)",
                  transform: isActive ? "scale(1.06)" : "scale(1)",
                  boxShadow: isActive ? `0 0 10px ${config.color}35` : "0 1px 3px rgba(0,0,0,0.06)",
                }}
                className="w-[38px] h-[38px] min-w-[38px] min-h-[38px] rounded-full bg-white/95 border-[1.5px] flex items-center justify-center cursor-pointer outline-none p-0 transition-all duration-200"
              >
                <Icon size={18} strokeWidth={2.3} color={isActive ? config.color : "#475569"} />
              </button>
            )
          })}
        </nav>

        {/* 2. Version Desktop (md:) : Liens textuels */}
        <nav aria-label="Navigation desktop" className="nav-desktop-view items-center gap-1">
          {sections.map((section, index) => {
            const isActive = activeSection === index
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSelectSection(index)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer outline-none ${
                  isActive
                    ? "text-slate-900 bg-black/8 border border-black/10 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-black/5 border border-transparent"
                }`}
              >
                {section.title}
              </button>
            )
          })}
        </nav>

        {/* Séparateur */}
        <div className="w-[1px] h-[22px] bg-black/10 shrink-0 mx-0.5" />

        {/* 3. Burger & CTA adaptés Desktop / Mobile */}
        <div ref={burgerRef} className="relative flex items-center shrink-0">
          {/* A. MOBILE (< md) : Déploiement vertical vers le haut, centré sur l'axe du burger */}
          <div
            className="burger-mobile-only"
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              left: "50%",
              transform: open
                ? "translateX(-50%) translateY(0) scale(1)"
                : "translateX(-50%) translateY(8px) scale(0.9)",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "5px",
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.94)" : "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1.5px solid rgba(255, 255, 255, 0.95)",
              borderRadius: "9999px",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.05)",
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              zIndex: 100,
            }}
          >
            {/* CTA Thème Mobile */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Changer de thème"
              className="w-[38px] h-[38px] min-w-[38px] rounded-full bg-white/95 border border-amber-500/40 flex items-center justify-center cursor-pointer shadow-xs hover:scale-105 active:scale-95 transition-transform outline-none"
            >
              {isDark ? <Moon size={16} className="text-sky-600" /> : <Sun size={16} className="text-amber-600" />}
            </button>

            {/* CTA Langue Mobile */}
            <button
              type="button"
              onClick={onToggleLang}
              aria-label="Changer de langue"
              className="w-[38px] h-[38px] min-w-[38px] rounded-full bg-white/95 border border-emerald-600/40 flex items-center justify-center cursor-pointer shadow-xs hover:scale-105 active:scale-95 transition-transform outline-none text-xs font-mono font-bold text-emerald-600"
            >
              {lang}
            </button>
          </div>

          {/* B. DESKTOP (md:) : Déploiement horizontal latéral classique */}
          <div
            style={{
              maxWidth: open ? "84px" : "0px",
              opacity: open ? 1 : 0,
              transform: open ? "scale(1)" : "scale(0.85)",
              pointerEvents: open ? "auto" : "none",
            }}
            className="burger-desktop-only items-center gap-1.5 overflow-hidden transition-all duration-300 ease-out mr-1"
          >
            {/* CTA Thème Desktop */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Changer de thème"
              className="w-[32px] h-[32px] min-w-[32px] rounded-full bg-white/95 border border-amber-500/40 flex items-center justify-center cursor-pointer shadow-xs hover:scale-105 active:scale-95 transition-transform outline-none"
            >
              {isDark ? <Moon size={15} className="text-sky-600" /> : <Sun size={15} className="text-amber-600" />}
            </button>

            {/* CTA Langue Desktop */}
            <button
              type="button"
              onClick={onToggleLang}
              aria-label="Changer de langue"
              className="w-[32px] h-[32px] min-w-[32px] rounded-full bg-white/95 border border-emerald-600/40 flex items-center justify-center cursor-pointer shadow-xs hover:scale-105 active:scale-95 transition-transform outline-none text-[11px] font-mono font-bold text-emerald-600"
            >
              {lang}
            </button>
          </div>

          {/* Bouton Burger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Options"
            className="w-[38px] h-[38px] min-w-[38px] md:w-[32px] md:h-[32px] md:min-w-[32px] rounded-full bg-white/95 border border-black/10 flex items-center justify-center cursor-pointer shadow-xs hover:scale-105 active:scale-95 transition-transform outline-none"
          >
            {open ? <X size={17} className="text-sky-600" /> : <Menu size={17} className="text-slate-800" />}
          </button>
        </div>
      </div>
    </header>
  )
}
