"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ArrowDown, Rocket } from "lucide-react"
import { useTheme } from "next-themes"
import TypewriterComponent from "typewriter-effect"
import HeroModel from "@/components/3d/hero-model"
import TransformingButton from "@/components/ui/transforming-button"
import Link from "next/link"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return

    const tl = gsap.timeline()

    tl.from(textRef.current.querySelectorAll(".gsap-hero-anim"), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.5,
    })

    // Cleanup
    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--primary-glow)', opacity: 0.1 }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--primary-glow)', opacity: 0.1 }}
        />
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
              <h2 
                className="font-orbitron text-xl mb-2 gsap-hero-anim"
                style={{ color: 'var(--primary-color)' }}
              >
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
                <span style={{ color: 'var(--text-heading)' }}>YOUR NAME</span>
                <span style={{ color: 'var(--primary-color)' }}>.</span>
              </h1>
              <p 
                className="text-lg mb-8 max-w-lg gsap-hero-anim"
                style={{ color: 'var(--text-muted)' }}
              >
                Transforming ideas into immersive digital experiences with cutting-edge technology and creative design.
              </p>
              <div className="flex flex-wrap gap-4 gsap-hero-anim">
                <TransformingButton href="#projects" variant="primary" className="w-36">
                  View Projects
                </TransformingButton>
                <TransformingButton href="#contact" variant="secondary" className="w-36">
                  Contact Me
                </TransformingButton>
                <Link href="/simple">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-600 text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 border border-white/10"
                  >
                    <Rocket size={18} className="animate-pulse" />
                    <span>Let&apos;s Go to Space</span>
                  </motion.button>
                </Link>
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
            <span 
              className="text-sm mb-2 font-orbitron"
              style={{ color: 'var(--text-muted)' }}
            >
              SCROLL DOWN
            </span>
            <ArrowDown style={{ color: 'var(--primary-color)' }} size={20} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
