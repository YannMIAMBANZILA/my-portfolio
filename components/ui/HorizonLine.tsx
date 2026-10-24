"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface HorizonLineProps {
  className?: string
  topPosition?: string
}

export function HorizonLine({ className = "", topPosition = "49.5%" }: HorizonLineProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-x-0 pointer-events-none select-none z-0 ${className}`}
      style={{
        top: topPosition,
        transform: "translateY(-50%)",
      }}
    >
      {/* 1. Halo lumineux d'horizon (lueur atmosphérique de jour) */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-20 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255, 255, 255, 0.8) 0%, rgba(148, 163, 184, 0.3) 50%, transparent 80%)",
        }}
      />

      {/* 2. Ligne d'horizon principale bien visible et nette (épaisseur augmentée) */}
      <div className="relative w-full flex items-center justify-center">
        {/* Ligne d'horizon épaisse avec dégradé subtil aux extrémités */}
        <div
          className="w-full h-[2.5px] md:h-[3px] bg-gradient-to-r from-transparent via-slate-500 to-transparent shadow-[0_1px_4px_rgba(0,0,0,0.25)]"
        />

        {/* 3. Point d'apex central (repère optique Tesla Autopilot) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700 shadow-[0_0_8px_rgba(15,23,42,0.6)] border border-white/60" />
          <motion.div
            className="absolute w-6 h-6 rounded-full border border-slate-500/50"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* 4. Repères angulaires / compas Tesla (subtils et nets en gris sobre) */}
      <div className="relative w-full max-w-xl mx-auto flex justify-between px-8 pt-1.5 opacity-60 font-mono text-[9px] md:text-[10px] text-slate-600 font-semibold">
        <span>-30°</span>
        <span>-15°</span>
        <span className="text-slate-800 font-black tracking-widest bg-slate-300/80 px-2 py-0.5 rounded shadow-xs">
          HORIZON • 000°
        </span>
        <span>+15°</span>
        <span>+30°</span>
      </div>
    </div>
  )
}
