"use client"

import * as React from "react"
import { motion, MotionValue, useTransform } from "framer-motion"

interface SectionData {
  id: number
  title: string
  subtitle: string
  status: string
}

interface RoadSignProps {
  project: SectionData
  progress: MotionValue<number>
  index: number
}

export function RoadSign({ project, progress, index }: RoadSignProps) {
  // Chaque projet occupe 25% de la progression du scroll
  const start = index * 0.25
  const end = start + 0.25

  // Translation le long de l'axe de la route (de l'horizon vers la caméra)
  const topPosition = useTransform(progress, [start, end], ["-10%", "150%"])

  // Opacité avec transition douce d'apparition/disparition
  const opacity = useTransform(
    progress,
    [start - 0.02, start + 0.02, end - 0.05, end],
    [0, 1, 1, 0]
  )

  return (
    <motion.div
      style={{
        position: "absolute",
        top: topPosition,
        left: "-15%",
        width: "130%",
        transform: "translateY(-100%) rotateX(-75deg)",
        transformOrigin: "bottom center",
        opacity: opacity,
        zIndex: 10,
      }}
      className="flex flex-col items-center pointer-events-none select-none"
    >
      {/* --- TRAVERSE TUBULAIRE SUPÉRIEURE DU PORTIQUE (Structure métallique porteuse) --- */}
      <div className="relative w-[92%] max-w-[1020px] h-3 mb-1 flex items-center justify-between px-6 z-10">
        {/* Tube horizontal supérieur en acier galvanisé */}
        <div
          className="absolute inset-x-0 h-2.5 rounded-full shadow-lg"
          style={{
            background:
              "linear-gradient(180deg, #64748b 0%, #cbd5e1 35%, #94a3b8 70%, #334155 100%)",
          }}
        />
        {/* Colliers de fixation gauche et droite */}
        <div className="relative z-10 w-6 h-4 bg-slate-700 border border-slate-400 rounded-sm shadow-md" />
        <div className="relative z-10 w-6 h-4 bg-slate-700 border border-slate-400 rounded-sm shadow-md" />
      </div>

      {/* --- PANNEAU ROUTIER DE SIGNALISATION AUTOROUTIÈRE (Épaisseur fine, listel normalisé) --- */}
      <div
        className="relative flex flex-col w-[88%] max-w-[960px] rounded-2xl shadow-[0_35px_80px_rgba(0,0,0,0.85)] z-20 overflow-hidden"
        style={{
          // Tranche fine en aluminium extrudé avec chanfrein réaliste
          background: "linear-gradient(135deg, #091322 0%, #060b14 100%)",
          border: "2.5px solid #94a3b8",
          boxShadow:
            "0 30px 70px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.8)",
        }}
      >
        {/* Glissière de fixation métallique supérieure */}
        <div
          className="w-full h-1.5 opacity-90"
          style={{
            background:
              "linear-gradient(90deg, #475569 0%, #94a3b8 20%, #cbd5e1 50%, #94a3b8 80%, #475569 100%)",
          }}
        />

        {/* --- LISTEL INTÉRIEUR NORMALISÉ (Liseré blanc de sécurité typique des panneaux réels) --- */}
        <div className="relative flex flex-col m-2.5 md:m-3 p-5 md:p-8 rounded-xl border border-white/35 bg-gradient-to-b from-[#0f1d33]/90 via-[#0a1424]/95 to-[#060e1a]/95">
          {/* Lueur subtile de rétro-réflexion (effet micro-billes de classe 2/3 sous les phares) */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 50% 10%, rgba(249,115,22,0.3) 0%, rgba(255,255,255,0.1) 40%, transparent 80%)",
            }}
          />

          {/* En-tête : Cartouche de section routière / Autoroute */}
          <div className="relative z-10 flex justify-between items-center pb-4 border-b border-slate-700/60">
            {/* Cartouche stylisée "SORTIE / SECTION" avec coins arrondis */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-600/90 text-white font-mono text-xs md:text-sm font-bold tracking-wider rounded-md border border-orange-400/50 shadow-sm">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                VOIE {project.id}
              </span>
              <span className="font-mono text-slate-300 text-xs md:text-sm tracking-widest font-semibold">
                {project.status}
              </span>
            </div>

            {/* Balise de position kilométrique / repère */}
            <div className="flex items-center gap-2 font-mono text-xs md:text-sm text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              PK 0{project.id}.00
            </div>
          </div>

          {/* Contenu principal : Destination / Titre de la section (Typographie routière moderne) */}
          <div className="relative z-10 py-10 md:py-16 flex flex-col items-center justify-center text-center">
            <h2
              className="font-sans text-white text-3xl md:text-6xl font-black tracking-wider uppercase mb-5 leading-tight"
              style={{
                textShadow:
                  "0 2px 10px rgba(0,0,0,0.9), 0 0 25px rgba(249,115,22,0.45)",
                letterSpacing: "0.08em",
              }}
            >
              {project.title}
            </h2>

            {/* Cartouche directionnelle secondaire */}
            <div className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700/80 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <p className="font-mono text-orange-400 text-xs md:text-lg font-bold tracking-widest uppercase">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Bas du panneau : Flèches d'affectation de voies (Signature indiscutable d'un panneau autoroutier) */}
          <div className="relative z-10 pt-4 border-t border-slate-700/60 flex justify-around items-center">
            {[1, 2, 3].map((lane) => (
              <div key={lane} className="flex flex-col items-center gap-1 opacity-70">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span className="font-mono text-[9px] md:text-[11px] text-slate-400 uppercase tracking-widest">
                  VOIE {lane}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Glissière de fixation inférieure */}
        <div
          className="w-full h-1.5 opacity-90"
          style={{
            background:
              "linear-gradient(90deg, #475569 0%, #94a3b8 20%, #cbd5e1 50%, #94a3b8 80%, #475569 100%)",
          }}
        />
      </div>

      {/* --- MÂTS TUBULAIRES EN ACIER GALVANISÉ (Structure porteuse élancée et crédible) --- */}
      <div className="flex justify-between w-[92%] max-w-[1020px] -mt-1 z-10 px-4">
        {/* Mât gauche cylindrique */}
        <div className="relative flex flex-col items-center w-8 md:w-12 h-[68vh]">
          {/* Tube cylindrique vertical avec ombrage métallique réaliste */}
          <div
            className="w-5 md:w-8 h-full rounded-b-md shadow-[15px_15px_40px_rgba(0,0,0,0.85)]"
            style={{
              background:
                "linear-gradient(90deg, #1e293b 0%, #64748b 25%, #cbd5e1 50%, #94a3b8 75%, #334155 100%)",
            }}
          />
          {/* Bagues d'assemblage tubulaire étagées */}
          {[0.2, 0.45, 0.7, 0.95].map((pos, i) => (
            <div
              key={i}
              className="absolute w-7 md:w-10 h-2 bg-slate-800 border border-slate-500 rounded-sm shadow-sm"
              style={{ top: `${pos * 100}%` }}
            />
          ))}
          {/* Platine de fixation au sol */}
          <div className="absolute bottom-0 w-8 md:w-12 h-3 bg-slate-800 border-t border-slate-500 rounded-sm shadow-md" />
        </div>

        {/* Mât droit cylindrique */}
        <div className="relative flex flex-col items-center w-8 md:w-12 h-[68vh]">
          {/* Tube cylindrique vertical */}
          <div
            className="w-5 md:w-8 h-full rounded-b-md shadow-[-15px_15px_40px_rgba(0,0,0,0.85)]"
            style={{
              background:
                "linear-gradient(90deg, #1e293b 0%, #64748b 25%, #cbd5e1 50%, #94a3b8 75%, #334155 100%)",
            }}
          />
          {/* Bagues d'assemblage tubulaire étagées */}
          {[0.2, 0.45, 0.7, 0.95].map((pos, i) => (
            <div
              key={i}
              className="absolute w-7 md:w-10 h-2 bg-slate-800 border border-slate-500 rounded-sm shadow-sm"
              style={{ top: `${pos * 100}%` }}
            />
          ))}
          {/* Platine de fixation au sol */}
          <div className="absolute bottom-0 w-8 md:w-12 h-3 bg-slate-800 border-t border-slate-500 rounded-sm shadow-md" />
        </div>
      </div>
    </motion.div>
  )
}
