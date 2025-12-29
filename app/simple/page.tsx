"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeProvider } from "@/components/theme/theme-provider"
import SpacePortfolio from "@/components/simple/space-portfolio"

export default function SimplePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#6b5b95] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-300 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="space" forcedTheme="space">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SpacePortfolio />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  )
}
