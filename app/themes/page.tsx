"use client"

import { useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme/theme-provider"
import ThemePreview from "@/components/theme/theme-preview"

export default function ThemesPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      <ThemePreview />
    </ThemeProvider>
  )
}
