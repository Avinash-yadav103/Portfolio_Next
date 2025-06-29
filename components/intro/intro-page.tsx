"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MIPLogo from "@/components/ui/mip-logo"
import GlitchText from "@/components/effects/glitch-text"

interface IntroPageProps {
  onComplete: () => void
}

export default function IntroPage({ onComplete }: IntroPageProps) {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [showWarning, setShowWarning] = useState(true)

  const phases = [
    "INITIALIZING MECH SYSTEMS...",
    "LOADING NEURAL NETWORKS...",
    "CALIBRATING IDENTITY PROTOCOLS...",
    "ESTABLISHING SECURE CONNECTION...",
    "ACTIVATION COMPLETE"
  ]

  useEffect(() => {
    // Warning phase
    const warningTimer = setTimeout(() => {
      setShowWarning(false)
    }, 2000)

    // Progress through phases
    const phaseTimers = phases.map((_, index) => {
      return setTimeout(() => {
        setCurrentPhase(index)
        if (index === phases.length - 1) {
          setTimeout(onComplete, 2000)
        }
      }, 2000 + (index * 1500))
    })

    return () => {
      clearTimeout(warningTimer)
      phaseTimers.forEach(clearTimeout)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      exit={{
        opacity: 0,
        scale: 1.1,
        transition: { duration: 1 }
      }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#9333ea" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {showWarning ? (
          <motion.div
            key="warning"
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="mb-8"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: 3,
              }}
            >
              <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
                <polygon 
                  points="50,10 85,80 15,80" 
                  fill="none" 
                  stroke="#9333ea" 
                  strokeWidth="3"
                  className="animate-pulse"
                />
                <motion.line 
                  x1="50" 
                  y1="30" 
                  x2="50" 
                  y2="60" 
                  stroke="#9333ea" 
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <motion.circle 
                  cx="50" 
                  cy="70" 
                  r="3" 
                  fill="#9333ea"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                />
              </svg>
            </motion.div>
            
            <GlitchText 
              text="WARNING" 
              className="text-4xl font-bold text-purple-400 mb-4 font-mono tracking-wider"
            />
            
            <motion.p
              className="text-purple-300 text-lg font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              サイバーパンク
            </motion.p>
            
            <motion.p
              className="text-gray-400 text-sm mt-2 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              CYBERPUNK PROTOCOL ACTIVE
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            className="text-center w-full max-w-4xl px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Logo */}
            <div className="mb-12">
              <MIPLogo className="h-48" />
            </div>

            {/* Progress Section */}
            <div className="mb-8">
              <motion.div 
                className="w-full max-w-md mx-auto h-2 bg-gray-800 rounded-full overflow-hidden mb-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentPhase + 1) / phases.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.div>

              <motion.div 
                className="text-purple-400 text-sm font-mono mb-2"
                key={currentPhase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {phases[currentPhase]}
              </motion.div>

              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-purple-500 rounded-full"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* System Status */}
            <motion.div
              className="text-xs font-mono text-gray-500 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex justify-between mb-1">
                <span>NEURAL CORE:</span>
                <span className="text-green-400">ONLINE</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>QUANTUM LINK:</span>
                <span className="text-green-400">STABLE</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>SECURITY:</span>
                <span className="text-yellow-400">ENCRYPTED</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS:</span>
                <GlitchText 
                  text="READY" 
                  className="text-cyan-400"
                  glitchIntensity={1}
                />
              </div>
            </motion.div>

            {/* Bottom Text */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <p className="text-gray-400 text-xs font-mono mb-2">
                WELCOME TO THE DIGITAL FRONTIER
              </p>
              <div className="flex justify-center space-x-2">
                <motion.div
                  className="w-1 h-1 bg-purple-500 rounded-full"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className="w-1 h-1 bg-cyan-500 rounded-full"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div
                  className="w-1 h-1 bg-purple-500 rounded-full"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}