"use client"

import { motion } from "framer-motion"

export default function MIPLogo({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
      scale: 0.5
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    })
  }

  const glowVariants = {
    initial: { 
      filter: "drop-shadow(0 0 10px #9333ea)",
      scale: 1
    },
    animate: {
      filter: [
        "drop-shadow(0 0 10px #9333ea)",
        "drop-shadow(0 0 30px #9333ea)",
        "drop-shadow(0 0 10px #9333ea)"
      ],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.svg
        width="400"
        height="200"
        viewBox="0 0 400 200"
        className="w-full h-full"
        initial="initial"
        animate={animate ? "animate" : "initial"}
        variants={glowVariants}
      >
        {/* Background Panel */}
        <defs>
          <linearGradient id="panelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="50%" stopColor="#2d2d2d" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
          
          <linearGradient id="letterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="30%" stopColor="#ffd700" />
            <stop offset="70%" stopColor="#b8860b" />
            <stop offset="100%" stopColor="#daa520" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Tech Panel */}
        <rect x="10" y="10" width="380" height="180" rx="15" fill="url(#panelGradient)" stroke="#9333ea" strokeWidth="2" opacity="0.3"/>
        
        {/* Corner Details */}
        <polygon points="20,20 40,20 20,40" fill="#9333ea" opacity="0.5"/>
        <polygon points="380,20 360,20 380,40" fill="#9333ea" opacity="0.5"/>
        <polygon points="20,180 40,180 20,160" fill="#9333ea" opacity="0.5"/>
        <polygon points="380,180 360,180 380,160" fill="#9333ea" opacity="0.5"/>

        {/* Letter M */}
        <motion.g
          custom={0}
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
          variants={letterVariants}
          filter="url(#glow)"
        >
          <path
            d="M 50 150 L 50 60 L 75 60 L 95 110 L 115 60 L 140 60 L 140 150 L 120 150 L 120 90 L 105 130 L 85 130 L 70 90 L 70 150 Z"
            fill="url(#letterGradient)"
            stroke="#9333ea"
            strokeWidth="1"
          />
          {/* Tech details on M */}
          <rect x="60" y="70" width="3" height="15" fill="#9333ea" opacity="0.8"/>
          <rect x="127" y="70" width="3" height="15" fill="#9333ea" opacity="0.8"/>
          <circle cx="100" cy="140" r="2" fill="#9333ea"/>
        </motion.g>

        {/* Letter I */}
        <motion.g
          custom={1}
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
          variants={letterVariants}
          filter="url(#glow)"
        >
          <rect x="170" y="60" width="20" height="90" fill="url(#letterGradient)" stroke="#9333ea" strokeWidth="1"/>
          {/* Tech details on I */}
          <rect x="172" y="65" width="16" height="3" fill="#9333ea" opacity="0.8"/>
          <rect x="172" y="142" width="16" height="3" fill="#9333ea" opacity="0.8"/>
          <rect x="178" y="100" width="4" height="20" fill="#1a1a1a"/>
          <circle cx="180" cy="80" r="1.5" fill="#9333ea"/>
        </motion.g>

        {/* Letter P */}
        <motion.g
          custom={2}
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
          variants={letterVariants}
          filter="url(#glow)"
        >
          <path
            d="M 220 150 L 220 60 L 270 60 Q 290 60 290 80 L 290 100 Q 290 120 270 120 L 240 120 L 240 150 Z M 240 80 L 240 100 L 270 100 Q 275 100 275 90 L 275 90 Q 275 80 270 80 Z"
            fill="url(#letterGradient)"
            stroke="#9333ea"
            strokeWidth="1"
          />
          {/* Tech details on P */}
          <rect x="230" y="70" width="3" height="15" fill="#9333ea" opacity="0.8"/>
          <rect x="260" y="85" width="8" height="2" fill="#9333ea" opacity="0.8"/>
          <circle cx="250" cy="135" r="2" fill="#9333ea"/>
          <rect x="225" y="130" width="10" height="2" fill="#1a1a1a"/>
        </motion.g>

        {/* Warning Symbol */}
        <motion.g
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={animate ? { 
            opacity: 1, 
            scale: 1, 
            rotate: 0,
            transition: { delay: 1.2, duration: 0.6 }
          } : {}}
        >
          <polygon 
            points="340,45 355,70 325,70" 
            fill="none" 
            stroke="#9333ea" 
            strokeWidth="2"
          />
          <line x1="340" y1="55" x2="340" y2="62" stroke="#9333ea" strokeWidth="2"/>
          <circle cx="340" cy="66" r="1.5" fill="#9333ea"/>
        </motion.g>

        {/* Subtitle */}
        <motion.text
          x="200"
          y="180"
          textAnchor="middle"
          className="font-mono text-xs"
          fill="#9333ea"
          initial={{ opacity: 0 }}
          animate={animate ? { 
            opacity: 1,
            transition: { delay: 1.5, duration: 0.5 }
          } : {}}
        >
          MECH IDENTITY PROTOCOL
        </motion.text>

        {/* Tech Lines */}
        <motion.g
          initial={{ pathLength: 0, opacity: 0 }}
          animate={animate ? {
            pathLength: 1,
            opacity: 0.6,
            transition: { delay: 1.8, duration: 1 }
          } : {}}
        >
          <line x1="50" y1="35" x2="120" y2="35" stroke="#9333ea" strokeWidth="1"/>
          <line x1="280" y1="35" x2="350" y2="35" stroke="#9333ea" strokeWidth="1"/>
          <line x1="30" y1="100" x2="60" y2="100" stroke="#9333ea" strokeWidth="1"/>
          <line x1="340" y1="100" x2="370" y2="100" stroke="#9333ea" strokeWidth="1"/>
        </motion.g>
      </motion.svg>
    </div>
  )
}