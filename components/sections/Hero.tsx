"use client"

import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'

// --- MODÈLE VOITURE 3D ---
function CarModel() {
  return (
    <group>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.8, 0.6, 4]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.9, -0.2]} castShadow>
        <boxGeometry args={[1.4, 0.5, 2]} />
        <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.8} />
      </mesh>
      {[-1, 1].map((x) => 
        [-1.2, 1.2].map((z) => (
          <mesh key={`wheel-${x}-${z}`} position={[x, 0.3, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
            <meshStandardMaterial color="#222" roughness={0.8} />
          </mesh>
        ))
      )}
      <mesh position={[-0.6, 0.5, 2.01]}>
        <boxGeometry args={[0.4, 0.1, 0.05]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.6, 0.5, 2.01]}>
        <boxGeometry args={[0.4, 0.1, 0.05]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

// --- DONNÉES DES SECTIONS DU PORTFOLIO ---
const SECTIONS = [
  { id: 1, title: "YANN MIAMBANZILA", subtitle: "DÉVELOPPEUR WEB, AUTOMATISATION & IA", status: "BIENVENUE" },
  { id: 2, title: "À PROPOS DE MOI", subtitle: "PARCOURS & COMPÉTENCES", status: "SECTION 02" },
  { id: 3, title: "MES PROJETS", subtitle: "PORTFOLIO & RÉALISATIONS", status: "SECTION 03" },
  { id: 4, title: "CONTACT", subtitle: "TRAVAILLONS ENSEMBLE", status: "SECTION 04" },
]

// --- COMPOSANT PANNEAU GÉANT (PORTIQUE D'AUTOROUTE / MATRICE LED) ---
function OverheadSign({ project, progress, index }: { project: any, progress: MotionValue<number>, index: number }) {
  // Séparation stricte : chaque projet prend 25% du scroll
  const start = index * 0.25
  const end = start + 0.25
  
  // Le panneau traverse l'écran de l'horizon jusqu'à derrière la caméra
  const topPosition = useTransform(progress, [start, end], ["-10%", "150%"])
  
  // Gestion de l'opacité : Invisible avant son tour pour éviter qu'il n'attende à l'horizon !
  // Fade-in rapide au début de son intervalle, fade-out rapide à la fin
  const opacity = useTransform(
    progress,
    [start - 0.02, start + 0.02, end - 0.05, end],
    [0, 1, 1, 0]
  )

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: topPosition,
        // On écarte le conteneur pour que les poteaux soient dans l'herbe/en dehors de la route
        left: '-15%', 
        width: '130%',
        transform: 'translateY(-100%) rotateX(-75deg)',
        transformOrigin: 'bottom center',
        opacity: opacity,
        zIndex: 10
      }}
      className="flex flex-col items-center"
    >
      {/* Panneau principal hyper-réaliste */}
      <div className="relative flex flex-col bg-[#050505] border-[16px] border-[#151515] rounded-xl shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden w-[90%] max-w-[1000px] z-20" style={{ borderTopWidth: '24px' }}>
        
        {/* Bandeau métallique supérieur de protection */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-gray-600 to-gray-800 border-b border-gray-900"></div>

        {/* Effet matrice de LED réaliste (Points + Scanlines épaisses) */}
        <div className="absolute inset-0 bg-[radial-gradient(#f9731655_2px,transparent_2px)] [background-size:6px_6px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.9)_3px,rgba(0,0,0,0.9)_6px)] pointer-events-none opacity-80"></div>
        
        {/* En-tête style Gare / Info Trafic */}
        <div className="relative z-10 flex justify-between items-center px-6 md:px-10 pt-8 pb-3 border-b-2 border-orange-500/20 bg-black/40">
          <div className="font-mono text-orange-500/80 text-xs md:text-sm tracking-widest flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
            {project.status}
          </div>
          <div className="font-mono text-orange-500/80 text-xs md:text-sm tracking-widest">
            {project.id}/04
          </div>
        </div>

        {/* Contenu textuel avec hauteur augmentée (plus massif) */}
        <div className="relative z-10 px-6 md:px-10 py-16 md:py-24 flex flex-col items-center justify-center text-center w-full min-h-[300px] md:min-h-[400px]">
          <div className="font-sans text-orange-500 text-3xl md:text-6xl font-black tracking-widest uppercase mb-8 leading-tight" style={{ textShadow: '0 0 10px #f97316, 0 0 20px #f97316' }}>
            {project.title}
          </div>
          <div className="flex items-center gap-4 md:gap-8 mt-auto">
            <span className="font-mono text-orange-400 text-sm md:text-2xl font-bold tracking-[0.1em] bg-[#111] px-5 py-3 rounded border border-orange-500/30">
              {project.subtitle}
            </span>
          </div>
        </div>
        
        {/* Reflet sur l'écran vitré */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Structure du Portique (Treillis métallique) */}
      <div className="flex justify-between w-[85%] max-w-[920px] -mt-2">
        {/* Pilier Gauche : Écarté de la route, et TRÈS haut pour passer au-dessus de la caméra */}
        <div className="relative w-12 md:w-20 h-[65vh] bg-gradient-to-r from-gray-700 via-gray-400 to-gray-800 shadow-[20px_20px_50px_rgba(0,0,0,0.8)] border-x-[6px] border-gray-900 flex flex-col justify-between py-12 rounded-b-lg">
          {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="w-full h-3 bg-gray-900/60 rotate-45"></div>)}
        </div>
        
        {/* Pilier Droit */}
        <div className="relative w-12 md:w-20 h-[65vh] bg-gradient-to-r from-gray-700 via-gray-400 to-gray-800 shadow-[-20px_20px_50px_rgba(0,0,0,0.8)] border-x-[6px] border-gray-900 flex flex-col justify-between py-12 rounded-b-lg">
           {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="w-full h-3 bg-gray-900/60 -rotate-45"></div>)}
        </div>
      </div>
    </motion.div>
  )
}

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
              <OverheadSign key={section.id} project={section} progress={scrollYProgress} index={index} />
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