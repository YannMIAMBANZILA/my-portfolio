'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Ensure component is mounted to avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isDark = resolvedTheme === 'dark'

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative w-14 h-7 rounded-full bg-text-muted/20 border border-text-muted/10 p-1 flex items-center transition-colors duration-300 focus:outline-none"
            aria-label="Toggle Theme"
        >
            {/* Background Icons */}
            <div className="absolute inset-0 flex justify-between px-2 items-center pointer-events-none">
                <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-primary' : 'text-text-muted/40'}`} />
                <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-primary' : 'text-text-muted/40'}`} />
            </div>

            {/* Sliding Switch */}
            <motion.div
                className="w-5 h-5 bg-text-main rounded-full shadow-md z-10 flex items-center justify-center overflow-hidden"
                animate={{
                    x: isDark ? 28 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
            >
                {/* Micro icon inside the switch for extra premium feel */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {isDark ? (
                        <Moon className="w-3 h-3 text-background" />
                    ) : (
                        <Sun className="w-3 h-3 text-background" />
                    )}
                </div>
            </motion.div>
        </button>
    )
}
