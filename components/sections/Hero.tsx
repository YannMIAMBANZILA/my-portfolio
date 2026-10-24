"use client"

import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

import { CarModel } from '@/components/3d/CarModel'
import { RoadSign } from '@/components/ui/RoadSign'
import { HorizonLine } from '@/components/ui/HorizonLine'
import { TeslaNavDock } from '@/components/ui/TeslaNavDock'

// --- DONNÉES DES SECTIONS DU PORTFOLIO ---
const SECTIONS = [
  { id: 1, title: "YANN MIAMBANZILA", subtitle: "DÉVELOPPEUR WEB, AUTOMATISATION & IA", status: "BIENVENUE" },
  { id: 2, title: "À PROPOS DE MOI", subtitle: "PARCOURS & COMPÉTENCES", status: "SECTION 02" },
  { id: 3, title: "MES PROJETS", subtitle: "PORTFOLIO & RÉALISATIONS", status: "SECTION 03" },
  { id: 4, title: "CONTACT", subtitle: "TRAVAILLONS ENSEMBLE", status: "SECTION 04" },
]

// --- SCÈNE PRINCIPALE ---
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [lang, setLang] = useState<'FR' | 'EN'>('FR')
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? resolvedTheme === "dark" : true
  
  // Capture de la progression du scroll sur les 400vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Mise à jour de la section active en fonction du scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.floor(latest / 0.25)
    if (index > 3) index = 3
    if (index !== activeSection) {
      setActiveSection(index)
    }
  })

  // Fonction pour scroller automatiquement vers un panneau
  const handleScrollTo = (index: number) => {
    if (!containerRef.current) return
    const scrollTarget = (index * 0.25) + 0.05
    
    const scrollableDistance = containerRef.current.scrollHeight - window.innerHeight
    const targetY = containerRef.current.offsetTop + (scrollableDistance * scrollTarget)
    
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    })
  }

  return (
    // Conteneur de 400vh pour permettre un long scroll
    <>
      <section
        ref={containerRef}
        className="relative"
        style={{ height: '400vh', backgroundColor: '#e5e5e5' }}
      >
        {/* Conteneur Sticky (reste à l'écran) */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #dde2e8 0%, #cbd5e1 49.5%, #d1d5db 50%, #e2e8f0 100%)',
          }}
        >
          {/* Ligne d'horizon atmosphérique Tesla (calibrée à 49.5% pour coïncider avec l'apex de la route) */}
          <HorizonLine topPosition="49.5%" />

          {/* Caméra 3D CSS */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              perspective: '1000px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            {/* Plan de la route incliné */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                height: '250vh',
                transform: 'rotateX(75deg)',
                transformOrigin: 'bottom center',
                transformStyle: 'preserve-3d',
                borderLeft: '10px solid #94a3b8',
                borderRight: '10px solid #94a3b8',
                background: 'linear-gradient(to bottom, #dbe1e8 0%, #cbd5e1 50%, #94a3b8 100%)',
                boxShadow: '0 0 50px rgba(0,0,0,0.15)',
              }}
            >
              {/* Lignes pointillées liées EXCLUSIVEMENT au scroll */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '33.33%',
                  transform: 'translateX(-50%)',
                  width: '10px',
                  backgroundImage: 'linear-gradient(to bottom, #64748b 50%, transparent 50%)',
                  backgroundSize: '100% 200px',
                  backgroundPositionY: useTransform(scrollYProgress, [0, 1], ["0px", "5000px"]),
                }}
              />
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '66.66%',
                  transform: 'translateX(-50%)',
                  width: '10px',
                  backgroundImage: 'linear-gradient(to bottom, #64748b 50%, transparent 50%)',
                  backgroundSize: '100% 200px',
                  backgroundPositionY: useTransform(scrollYProgress, [0, 1], ["0px", "5000px"]),
                }}
              />

              {/* Panneaux de projets générés dynamiquement */}
              {SECTIONS.map((section, index) => (
                <RoadSign key={section.id} project={section} progress={scrollYProgress} index={index} />
              ))}
            </div>
          </div>

          {/* Voiture 3D au centre parfait */}
          <div
            className="car-container"
            style={{
              position: 'absolute',
              bottom: '5%',
              left: 0,
              right: 0,
              margin: '0 auto',
              width: '100%',
              maxWidth: '500px',
              height: '400px',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          >
            <Canvas camera={{ position: [0, 5, -9], fov: 35 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[10, 10, -5]} intensity={2} castShadow />
              <Environment preset="city" />
              <group rotation={[0, Math.PI, 0]}>
                <CarModel />
              </group>
              <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
            </Canvas>
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media (max-width: 768px) {
              .car-container {
                height: 250px !important;
                bottom: 8% !important;
              }
            }
          `,
          }}
        />
      </section>

      {/* 
        ========================================================================
        UI FLOTTANTE (GARANTIE AU PREMIER PLAN)
        ======================================================================== 
      */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 100,
        }}
      >
        {/* HUD Navigation Dials Tesla (CTAs ronds sur la gauche) */}
        <div
          style={{
            position: 'absolute',
            left: '1.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
          className="md:left-8"
        >
          <TeslaNavDock
            sections={SECTIONS}
            activeSection={activeSection}
            onSelectSection={handleScrollTo}
          />
        </div>

        {/* Boutons Tactiles Rapides (Style Tesla Quick Controls) */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0.85rem',
            pointerEvents: 'auto',
          }}
          className="md:bottom-8 md:right-8"
        >
          {/* Toggle Switch Langue (Style iOS FR / EN) */}
          <button
            type="button"
            role="switch"
            aria-checked={lang === "EN"}
            aria-label="Basculer la langue entre Français et Anglais"
            onClick={() => setLang(lang === "FR" ? "EN" : "FR")}
            className="relative w-[52px] h-[28px] rounded-full cursor-pointer transition-colors duration-300 shadow-md select-none shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            style={{
              backgroundColor: lang === "EN" ? "#22c55e" : "#94a3b8",
            }}
          >
            {/* Labels d'arrière-plan sur le rail */}
            <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none text-[9px] font-mono font-bold text-white/90">
              <span className={lang === "EN" ? "opacity-90" : "opacity-0"}>FR</span>
              <span className={lang === "FR" ? "opacity-90" : "opacity-0"}>EN</span>
            </div>

            {/* Curseur blanc rond mobile (Thumb) */}
            <motion.div
              animate={{ x: lang === "EN" ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className="absolute top-[3px] left-[3px] w-[22px] h-[22px] rounded-full bg-white shadow-md flex items-center justify-center pointer-events-none"
            >
              <span className="font-mono text-[9px] font-black text-zinc-900 leading-none">
                {lang}
              </span>
            </motion.div>
          </button>

          {/* Toggle Switch Dark / Light Mode (Style iOS Soleil / Lune) */}
          <button
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label="Basculer entre le mode clair et sombre"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-[52px] h-[28px] rounded-full cursor-pointer transition-colors duration-300 shadow-md select-none shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            style={{
              backgroundColor: isDark ? "#22c55e" : "#cbd5e1",
            }}
          >
            {/* Symboles d'arrière-plan sur le rail */}
            <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
              <Sun className={`w-3 h-3 text-amber-500 transition-opacity duration-200 ${isDark ? "opacity-90" : "opacity-0"}`} />
              <Moon className={`w-3 h-3 text-white transition-opacity duration-200 ${isDark ? "opacity-0" : "opacity-90"}`} />
            </div>

            {/* Curseur blanc rond mobile (Thumb) avec logo soleil/lune */}
            <motion.div
              animate={{ x: isDark ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className="absolute top-[3px] left-[3px] w-[22px] h-[22px] rounded-full bg-white shadow-md flex items-center justify-center pointer-events-none"
            >
              {isDark ? (
                <Moon className="w-3.5 h-3.5 text-zinc-900 fill-zinc-900" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              )}
            </motion.div>
          </button>
        </div>
      </div>
    </>
  )
}