"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ArrowDown } from "lucide-react"
import TypewriterComponent from "typewriter-effect"
import HeroModel from "@/components/3d/hero-model"
import TransformingButton from "@/components/ui/transforming-button"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Only run GSAP animations after component is mounted
    if (!isMounted) return

    const tl = gsap.timeline()

    // Make sure refs are available before using them
    if (textRef.current) {
      const elements = textRef.current.querySelectorAll(".gsap-hero-anim")
      if (elements.length > 0) {
        tl.from(elements, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5,
        })
      }
    }

    // Cleanup
    return () => {
      tl.kill()
    }
  }, [isMounted])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div ref={textRef} className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-red-500 font-orbitron text-xl mb-2 gsap-hero-anim">
                <TypewriterComponent
                  options={{
                    strings: ["FRONTEND DEVELOPER", "UI/UX DESIGNER", "CREATIVE CODER"],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                  }}
                />
              </h2>
              <h1 className="text-4xl md:text-6xl font-bold font-orbitron mb-6 gsap-hero-anim">
                <span className="text-white">YOUR NAME</span>
                <span className="text-red-500">.</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-lg gsap-hero-anim">
                Transforming ideas into immersive digital experiences with cutting-edge technology and creative design.
              </p>
              <div className="flex flex-wrap gap-4 gsap-hero-anim">
                <TransformingButton href="#projects" variant="primary" className="w-36">
                  View Projects
                </TransformingButton>
                <TransformingButton href="#contact" variant="secondary" className="w-36">
                  Contact Me
                </TransformingButton>
              </div>
            </motion.div>
          </div>

          {/* 3D Model */}
          <div className="order-1 lg:order-2 h-[400px] lg:h-[600px] relative">
            <HeroModel />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="flex flex-col items-center"
          >
            <span className="text-gray-400 text-sm mb-2 font-orbitron">SCROLL DOWN</span>
            <ArrowDown className="text-red-500" size={20} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
