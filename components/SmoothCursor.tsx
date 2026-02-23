'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function SmoothCursor() {
    const [hasMouse, setHasMouse] = useState(false)

    // Motion values for raw mouse position
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring physics for the cursor element
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
    const cursorX = useSpring(mouseX, springConfig)
    const cursorY = useSpring(mouseY, springConfig)

    useEffect(() => {
        // Only activate on devices that support hover (mouse pointer)
        const mediaQuery = window.matchMedia('(pointer: fine)')

        const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
            if (e.matches) {
                setHasMouse(true)
                document.documentElement.classList.add('cursor-none')
            } else {
                setHasMouse(false)
                document.documentElement.classList.remove('cursor-none')
            }
        }

        // Initial check
        handleMediaChange(mediaQuery)

        // Listener for changes
        mediaQuery.addEventListener('change', handleMediaChange)

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        if (hasMouse) {
            window.addEventListener('mousemove', moveCursor)
        }

        return () => {
            document.documentElement.classList.remove('cursor-none')
            window.removeEventListener('mousemove', moveCursor)
            mediaQuery.removeEventListener('change', handleMediaChange)
        }
    }, [hasMouse, mouseX, mouseY])

    if (!hasMouse) return null

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: '-50%',
                translateY: '-50%',
            }}
        >
            <div className="relative -translate-x-1 -translate-y-1">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary drop-shadow-md"
                >
                    <path
                        d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                        fill="currentColor"
                        stroke="white"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </motion.div>
    )
}
