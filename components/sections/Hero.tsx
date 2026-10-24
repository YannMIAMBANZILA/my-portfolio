"use client"

import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'

import { CarModel } from '@/components/3d/CarModel'
import { RoadSign } from '@/components/ui/RoadSign'

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
    // Le panneau commence son animation à `index * 0.25`.
    // Pour qu'il soit bien visible au centre-haut de l'écran (environ top: 20%), 
    // on ajoute une petite marge de 0.05 au scroll.
    const scrollTarget = (index * 0.25) + 0.05
    
    // Calcul de la position Y en pixels par rapport au document
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
      <section ref={containerRef} style={{ height: '400vh', backgroundColor: '#e5e5e5' }}>
      
      {/* Conteneur Sticky (reste à l'écran) */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
        
        {/* Caméra 3D CSS */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          perspective: '1000px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        }}>
          
          {/* Plan de la route incliné */}
          <div style={{ 
            position: 'relative', width: '100%', maxWidth: '800px', height: '250vh', 
            transform: 'rotateX(75deg)', transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
            borderLeft: '10px solid #a0a0a0', borderRight: '10px solid #a0a0a0'
          }}>
            
            {/* Lignes pointillées liées EXCLUSIVEMENT au scroll (plus d'animation infinie) */}
            <motion.div style={{ 
              position: 'absolute', top: 0, bottom: 0, left: '33.33%', transform: 'translateX(-50%)', width: '10px',
              backgroundImage: 'linear-gradient(to bottom, #a0a0a0 50%, transparent 50%)',
              backgroundSize: '100% 200px',
              backgroundPositionY: useTransform(scrollYProgress, [0, 1], ["0px", "5000px"])
            }}></motion.div>
            <motion.div style={{ 
              position: 'absolute', top: 0, bottom: 0, left: '66.66%', transform: 'translateX(-50%)', width: '10px',
              backgroundImage: 'linear-gradient(to bottom, #a0a0a0 50%, transparent 50%)',
              backgroundSize: '100% 200px',
              backgroundPositionY: useTransform(scrollYProgress, [0, 1], ["0px", "5000px"])
            }}></motion.div>

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
            position: 'absolute', bottom: '5%', left: 0, right: 0, margin: '0 auto',
            width: '100%', maxWidth: '500px', height: '400px', 
            pointerEvents: 'none', zIndex: 20 
          }}>
          <Canvas camera={{ position: [0, 5, -9], fov: 35 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, -5]} intensity={1.5} castShadow />
            <Environment preset="city" />
            <group rotation={[0, Math.PI, 0]}>
              <CarModel />
            </group>
            <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
          </Canvas>
        </div>

      </div>

        <style dangerouslySetInnerHTML={{__html: `
          /* Responsive : Sur mobile on réduit la HAUTEUR du conteneur. React Three Fiber réduira automatiquement la taille de la voiture de façon proportionnelle, tout en la gardant au centre absolu. */
          @media (max-width: 768px) {
            .car-container {
              height: 250px !important;
              bottom: 8% !important;
            }
          }
        `}} />
      </section>

      {/* 
        ========================================================================
        UI FLOTTANTE (GARANTIE AU PREMIER PLAN)
        ======================================================================== 
      */}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          pointerEvents: 'none',
          zIndex: 2147483647
        }}
      >
        {/* HUD Navigation Sidebar (Ultra-Minimaliste) */}
        <div 
          style={{
            position: 'absolute',
            left: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            pointerEvents: 'auto'
          }}
          className="md:left-8"
        >
          {SECTIONS.map((section, index) => {
            const isActive = activeSection === index
            return (
              <button 
                key={section.id} 
                onClick={() => handleScrollTo(index)}
                className="group relative flex items-center cursor-pointer"
                style={{ height: '32px' }}
              >
                {/* Ligne indicatrice (Fine et élégante) */}
                <div 
                  className={`transition-all duration-500 rounded-full ${isActive ? 'w-1.5 md:w-2 bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)]' : 'w-1 bg-slate-400 group-hover:bg-slate-600'}`}
                  style={{ height: isActive ? '32px' : '12px' }}
                ></div>
                
                {/* Label de la section (Typographie nette sans fond lourd) */}
                <div 
                  className={`absolute left-6 md:left-8 font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300 ${isActive ? 'text-orange-600 scale-105 origin-left' : 'text-slate-500 opacity-70 group-hover:opacity-100 group-hover:text-slate-800'}`}
                  style={{ textShadow: isActive ? '0px 0px 10px rgba(249,115,22,0.3)' : 'none' }}
                >
                  {section.title}
                </div>
              </button>
            )
          })}
        </div>

        {/* Boutons Tactiles (Style Tesla) */}
        <div 
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            pointerEvents: 'auto'
          }}
          className="md:bottom-8 md:right-8"
        >
          {/* Langue */}
          <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-900 border-2 border-gray-600 text-white flex items-center justify-center shadow-2xl hover:bg-gray-800 hover:scale-105 transition-all cursor-pointer">
            <span className="font-mono text-xl md:text-2xl font-bold">FR</span>
          </button>
          {/* Dark Mode */}
          <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-900 border-2 border-gray-600 text-white flex items-center justify-center shadow-2xl hover:bg-gray-800 hover:scale-105 transition-all cursor-pointer">
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}