"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
  glitchIntensity?: number
}

export default function GlitchText({ text, className = "", glitchIntensity = 3 }: GlitchTextProps) {
  const [glitchedText, setGlitchedText] = useState(text)
  
  const glitchChars = "!<>-_\\/[]{}—=+*^?#________"
  
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance to glitch
        const textArray = text.split("")
        const glitchCount = Math.floor(Math.random() * glitchIntensity) + 1
        
        for (let i = 0; i < glitchCount; i++) {
          const randomIndex = Math.floor(Math.random() * textArray.length)
          textArray[randomIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)]
        }
        
        setGlitchedText(textArray.join(""))
        
        // Reset after short time
        setTimeout(() => {
          setGlitchedText(text)
        }, 50 + Math.random() * 100)
      }
    }, 100)

    return () => clearInterval(glitchInterval)
  }, [text, glitchIntensity])

  return (
    <motion.span 
      className={className}
      style={{
        textShadow: `
          2px 0 #ff0000,
          -2px 0 #00ffff,
          0 0 10px #9333ea
        `
      }}
      animate={{
        textShadow: [
          "2px 0 #ff0000, -2px 0 #00ffff, 0 0 10px #9333ea",
          "3px 0 #ff0000, -3px 0 #00ffff, 0 0 15px #9333ea",
          "1px 0 #ff0000, -1px 0 #00ffff, 0 0 5px #9333ea"
        ]
      }}
      transition={{
        duration: 0.1,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      {glitchedText}
    </motion.span>
  )
}