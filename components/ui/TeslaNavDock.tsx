"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { User, BookOpen, Phone } from "lucide-react"

export interface SectionItem {
  id: number
  title: string
  subtitle: string
  status: string
}

interface TeslaNavDockProps {
  sections: SectionItem[]
  activeSection: number
  onSelectSection: (index: number) => void
  className?: string
}

export function TeslaNavDock({
  sections,
  activeSection,
  onSelectSection,
  className = "",
}: TeslaNavDockProps) {
  // Configuration des icônes et couleurs adaptées aux sections du portfolio
  const SECTION_ICONS = [
    {
      // 01. Yann Miambanzila / Accueil : Logo Tesla
      color: "#38bdf8",
      renderIcon: (isActive: boolean) => (
        <svg
          style={{
            width: "20px",
            height: "20px",
            color: isActive ? "#38bdf8" : "#ffffff",
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-colors duration-200"
        >
          <path
            fill="currentColor"
            d="M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.619 5.034c-3.18 0-4.188.354-4.335 1.792 0 0-2.146-.795-3.229-2.43C5.28 2.431 9.525 2.34 9.525 2.34L12 5.362l-.004.002H12v-.002zm0-3.899c3.415-.03 7.326.528 11.328 2.28.535-.968.672-1.395.672-1.395C19.625.612 15.528.015 12 0 8.472.015 4.375.61 0 2.349c0 0 .195.525.672 1.396C4.674 1.989 8.585 1.435 12 1.46v.003z"
          />
        </svg>
      ),
    },
    {
      // 02. À Propos De Moi : Icône utilisateur / profil login
      color: "#22c55e",
      renderIcon: (isActive: boolean) => (
        <User
          style={{ width: "20px", height: "20px" }}
          className="transition-colors duration-200"
          stroke={isActive ? "#22c55e" : "#ffffff"}
          strokeWidth={2.4}
        />
      ),
    },
    {
      // 03. Mes Projets : Icône book / classeur
      color: "#eab308",
      renderIcon: (isActive: boolean) => (
        <BookOpen
          style={{ width: "20px", height: "20px" }}
          className="transition-colors duration-200"
          stroke={isActive ? "#eab308" : "#ffffff"}
          strokeWidth={2.4}
        />
      ),
    },
    {
      // 04. Contact : Icône téléphone
      color: "#3b82f6",
      renderIcon: (isActive: boolean) => (
        <Phone
          style={{ width: "20px", height: "20px" }}
          className="transition-colors duration-200"
          stroke={isActive ? "#3b82f6" : "#ffffff"}
          strokeWidth={2.4}
        />
      ),
    },
  ]

  return (
    <nav
      aria-label="Navigation des sections"
      className={`relative flex flex-col gap-6 md:gap-7 pointer-events-auto select-none items-center ${className}`}
    >
      {sections.map((section, index) => {
        const isActive = activeSection === index
        const iconConfig = SECTION_ICONS[index] || SECTION_ICONS[0]

        return (
          <div
            key={section.id}
            onClick={() => onSelectSection(index)}
            className="relative flex flex-col items-center group cursor-pointer"
          >
            {/* Bouton rond plus petit (36px) : 100% rond garanti */}
            <button
              role="tab"
              aria-selected={isActive}
              aria-label={`Naviguer vers ${section.title}`}
              className={`relative z-10 flex items-center justify-center transition-all duration-200 cursor-pointer outline-none shrink-0 ${
                isActive
                  ? "scale-105"
                  : "hover:scale-105"
              }`}
              style={{
                width: "36px",
                height: "36px",
                minWidth: "36px",
                minHeight: "36px",
                maxWidth: "36px",
                maxHeight: "36px",
                borderRadius: "50%",
                aspectRatio: "1 / 1",
                backgroundColor: "#000000",
                border: isActive
                  ? `2px solid ${iconConfig.color}`
                  : "1.5px solid #333333",
                boxShadow: "none",
                padding: 0,
              }}
            >
              {/* Icône haute visibilité */}
              <div className="flex items-center justify-center">
                {iconConfig.renderIcon(isActive)}
              </div>

              {/* Anneau subtil d'activation */}
              {isActive && (
                <motion.div
                  className="absolute inset-[-3px] pointer-events-none"
                  style={{
                    border: `1.5px solid ${iconConfig.color}`,
                    borderRadius: "50%",
                  }}
                  animate={{
                    opacity: [0.7, 0.2, 0.7],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </button>

            {/* Titre EN DESSOUS du CTA : avec espacement soigné */}
            <span
              className={`mt-1.5 font-sans font-bold uppercase tracking-tight text-[8px] md:text-[9px] leading-tight text-center select-none transition-all duration-200 max-w-[64px] ${
                isActive ? "opacity-100 font-extrabold" : "opacity-75 group-hover:opacity-100"
              }`}
              style={{
                color: iconConfig.color,
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.95), 0 0 6px rgba(0, 0, 0, 0.8)",
              }}
            >
              {section.title}
            </span>
          </div>
        )
      })}
    </nav>
  )
}


