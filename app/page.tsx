"use client"

import { useState, useEffect } from "react"
import IntroPage from "@/components/intro/intro-page"
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
  const [showIntro, setShowIntro] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    setLoading(true)

    // After intro, show loader for a short time
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) {
    return null
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroPage key="intro" onComplete={handleIntroComplete} />
        ) : loading ? (
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
