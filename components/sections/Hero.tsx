"use client"

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { CarModel } from '@/components/3d/CarModel'
import { RoadSign } from '@/components/ui/RoadSign'
import { HorizonLine } from '@/components/ui/HorizonLine'
import { FloatingNavbar } from '@/components/layout/FloatingNavbar'

// --- DONNÉES DES SECTIONS DU PORTFOLIO ---
const SECTIONS = [
  { id: 1, title: "ACCUEIL", subtitle: "YANN MIAMBANZILA • DÉVELOPPEUR WEB & IA", status: "BIENVENUE" },
  { id: 2, title: "À PROPOS", subtitle: "PARCOURS & COMPÉTENCES", status: "SECTION 02" },
  { id: 3, title: "PROJETS", subtitle: "PORTFOLIO & RÉALISATIONS", status: "SECTION 03" },
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

  const isDark = mounted ? resolvedTheme === "dark" : false
  
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
            {/* Plan de la route incliné avec perspective plus basse et effet verre glossy */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '920px',
                height: '250vh',
                transform: 'rotateX(79deg)',
                transformOrigin: 'bottom center',
                transformStyle: 'preserve-3d',
                borderLeft: '2px solid rgba(255, 255, 255, 0.65)',
                borderRight: '2px solid rgba(255, 255, 255, 0.65)',
                background: 'linear-gradient(to bottom, #d5dde8 0%, #c4cfde 35%, #b1c0d4 70%, #9cb1c9 100%)',
                boxShadow: '0 0 60px rgba(148, 163, 184, 0.25), inset 0 0 80px rgba(255, 255, 255, 0.35)',
              }}
            >
              {/* Liseré néon glossy supplémentaire sur les bords extérieurs */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: '1px',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.2))',
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  width: '1px',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.2))',
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                }}
              />

              {/* Lignes pointillées centrales ultra-fines (3px) reliées au scroll */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '33.33%',
                  transform: 'translateX(-50%)',
                  width: '3px',
                  backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 50%, transparent 50%)',
                  backgroundSize: '100% 160px',
                  backgroundPositionY: useTransform(scrollYProgress, [0, 1], ["0px", "5000px"]),
                  filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))',
                }}
              />
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '66.66%',
                  transform: 'translateX(-50%)',
                  width: '3px',
                  backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 50%, transparent 50%)',
                  backgroundSize: '100% 160px',
                  backgroundPositionY: useTransform(scrollYProgress, [0, 1], ["0px", "5000px"]),
                  filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))',
                }}
              />

              {/* Panneaux de projets générés dynamiquement */}
              {SECTIONS.map((section, index) => (
                <RoadSign key={section.id} project={section} progress={scrollYProgress} index={index} />
              ))}
            </div>
          </div>

          {/* Voiture 3D au centre parfait avec rendu ultra-net haute définition */}
          <div
            className="car-container"
            style={{
              position: 'absolute',
              bottom: '4%',
              left: 0,
              right: 0,
              margin: '0 auto',
              width: '100%',
              maxWidth: '680px',
              height: '520px',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          >
            <Canvas
              camera={{ position: [0, 4.2, -10], fov: 30 }}
              dpr={[1.5, 3]}
              gl={{
                antialias: true,
                powerPreference: 'high-performance',
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.05,
              }}
            >
              <ambientLight intensity={0.95} />
              <directionalLight position={[10, 14, -6]} intensity={2.4} />
              <Environment preset="city" />

              {/* Reflet miroir unique sous la voiture orienté de dos (feux arrière vers la caméra) */}
              <group position={[0, -0.01, 0]} scale={[1, -1.0, 1]} rotation={[0, 0, 0]}>
                <CarModel isReflection={true} />
              </group>

              {/* Voiture principale 3D vue de dos (poupe et feux stop bien visibles) */}
              <group rotation={[0, 0, 0]}>
                <CarModel />
              </group>

              {/* Ombre de contact douce et dégradée entre la voiture et son reflet */}
              <ContactShadows position={[0, 0, 0]} opacity={0.35} scale={7.0} blur={2.2} far={2.0} color="#334155" />
            </Canvas>
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media (max-width: 768px) {
              .car-container {
                height: 320px !important;
                bottom: 6% !important;
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
        className="floating-navbar-container"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          paddingLeft: '10px',
          paddingRight: '10px',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        <FloatingNavbar
          sections={SECTIONS}
          activeSection={activeSection}
          onSelectSection={handleScrollTo}
          lang={lang}
          onToggleLang={() => setLang(lang === "FR" ? "EN" : "FR")}
          isDark={isDark}
          onToggleTheme={() => setTheme(isDark ? "light" : "dark")}
        />
      </div>
    </>
  )
}