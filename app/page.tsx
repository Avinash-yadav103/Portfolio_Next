"use client"

import { useState, useEffect } from "react"
import LoaderScreen from "@/components/loader/loader-screen"
import Navbar from "@/components/navigation/navbar"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import ProjectsSection from "@/components/sections/projects-section"
import ExperienceSection from "@/components/sections/experience-section"
import EducationSection from "@/components/sections/education-section"
import CreativeShowcase from "@/components/sections/creative-showcase"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/navigation/footer"
import CubeBackground from "@/components/3d/cube-background"
import TransformerBot from "@/components/chat/transformer-bot"
import { AnimatePresence } from "framer-motion"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Simulate loading time (you can replace with actual asset loading)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) {
    return null
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence>
        {loading ? (
          <LoaderScreen key="loader" />
        ) : (
          <>
            <div className="fixed inset-0 z-0">
              <CubeBackground />
            </div>
            <div className="relative z-10">
              <Navbar />
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <ExperienceSection />
              <EducationSection />
              <CreativeShowcase />
              <ContactSection />
              <Footer />
              <TransformerBot />
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
