"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect, useState } from "react"

// Define available themes
export const themes = [
  { id: "system", name: "System", description: "Follow system preference" },
  { id: "light", name: "Light", description: "Bright and clean" },
  { id: "dark", name: "Dark", description: "Easy on the eyes" },
  { id: "optimus", name: "Optimus Prime", description: "Heroic red & blue" },
  { id: "bumblebee", name: "Bumblebee", description: "Energetic yellow & black" },
  { id: "space", name: "Space", description: "Neumorphic purple cosmos" },
] as const

export type ThemeId = (typeof themes)[number]["id"]

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // Ensure theme is only applied after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR and initial client render, return children without theme context
  // to prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider
      themes={["system", "light", "dark", "optimus", "bumblebee", "space"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
