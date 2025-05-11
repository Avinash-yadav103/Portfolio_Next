"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import GlitchEffect from "./glitch-effect"
import TriangularLoader from "./triangular-loader"

export default function LoaderScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const leftDoorRef = useRef<HTMLDivElement>(null)
  const rightDoorRef = useRef<HTMLDivElement>(null)
  const topDoorRef = useRef<HTMLDivElement>(null)
  const faceContainerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Only run animations after component is mounted
    if (!isMounted) return

    const tl = gsap.timeline()

    // Check if refs are available before using them
    if (!leftDoorRef.current || !rightDoorRef.current || !topDoorRef.current || !faceContainerRef.current) return

    // Initial state for doors
    gsap.set(leftDoorRef.current, { x: "-100%" })
    gsap.set(rightDoorRef.current, { x: "100%" })
    gsap.set(topDoorRef.current, { y: "-100%" })
    gsap.set(faceContainerRef.current, { opacity: 0, scale: 0.5 })

    // Door animation sequence
    tl.to(leftDoorRef.current, { x: "0%", duration: 1.2, ease: "power3.inOut" })
      .to(rightDoorRef.current, { x: "0%", duration: 1.2, ease: "power3.inOut" }, "<")
      .to(topDoorRef.current, { y: "0%", duration: 1.2, ease: "power3.inOut" }, "<0.3")
      .to(
        faceContainerRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.5",
      )

    // Only target triangle parts if they exist
    const triangleParts = document.querySelectorAll(".triangle-part")
    if (triangleParts.length > 0) {
      tl.from(
        triangleParts,
        {
          scale: 0,
          opacity: 0,
          stagger: 0.2,
          ease: "back.out(1.7)",
          duration: 0.8,
        },
        "-=0.3",
      )
    }

    // Only animate text if it exists
    if (textRef.current) {
      tl.to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5",
      )
    }

    // Cleanup
    return () => {
      tl.kill()
    }
  }, [isMounted])

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
      exit={{
        opacity: 0,
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      }}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Door elements */}
        <div className="absolute inset-0">
          {/* Left Door */}
          <div
            ref={leftDoorRef}
            className="absolute top-0 left-0 w-1/2 h-full bg-gray-900 border-r border-red-500 z-10"
            style={{ boxShadow: "inset 0 0 20px #ef4444" }}
          />

          {/* Right Door */}
          <div
            ref={rightDoorRef}
            className="absolute top-0 right-0 w-1/2 h-full bg-gray-900 border-l border-red-500 z-10"
            style={{ boxShadow: "inset 0 0 20px #ef4444" }}
          />

          {/* Top Door */}
          <div
            ref={topDoorRef}
            className="absolute top-0 left-0 w-full h-1/3 bg-gray-900 border-b border-red-500 z-20"
            style={{ boxShadow: "inset 0 0 20px #ef4444" }}
          />
        </div>

        {/* Triangular loader */}
        <div className="mb-16 z-30">
          <TriangularLoader />
        </div>

        {/* Autobot logo with glitch effect */}
        <div ref={faceContainerRef} className="mb-8 w-40 h-40 relative z-30">
          <GlitchEffect />
        </div>

        {/* Loading text */}
        <motion.div ref={textRef} initial={{ opacity: 0, y: 20 }} className="text-center z-30">
          <h2 className="text-2xl md:text-3xl font-orbitron text-red-500 mb-2 tracking-wider">INITIALIZING SYSTEMS</h2>
          <div className="flex flex-col items-center">
            <div className="flex justify-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse delay-150"></div>
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse delay-300"></div>
            </div>
            <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full animate-progress"></div>
            </div>
            <div className="mt-4 font-mono text-xs text-gray-400 max-w-md">
              <p className="typewriter-text">
                {">"} Loading core systems...
                <br />
                {">"} Initializing neural network...
                <br />
                {">"} Calibrating transformation protocols...
                <br />
                {">"} Activating Cybertronian interface...
                <br />
                {">"} All systems online. Welcome to Cybertron.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
