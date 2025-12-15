"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        
        {/* Petit badge au dessus du titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm text-slate-600 dark:text-slate-400"
        >
          👋 Disponible pour une alternance
        </motion.div>

        {/* Titre Principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
        >
          Développeur Web <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
            Next.js & React
          </span>
        </motion.h1>

        {/* Sous-titre (Pitch) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto"
        >
          Je conçois des expériences web modernes, performantes et accessibles. 
          Transformons vos idées en réalité digitale.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="#contact"
            className="px-8 py-3 rounded-lg bg-primary text-white font-medium hover:bg-indigo-600 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
          >
            Me contacter <ArrowRight size={18} />
          </Link>
          
          <a 
            href="/cv.pdf" // Assure-toi de mettre un fichier cv.pdf dans le dossier public/ plus tard
            target="_blank"
            className="px-8 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
          >
            Télécharger CV <Download size={18} />
          </a>
        </motion.div>

      </div>
    </section>
  )
}