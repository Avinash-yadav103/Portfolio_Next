"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Link from "next/link"

interface TransformingButtonProps {
  href: string
  children: React.ReactNode
  variant?: "primary" | "secondary"
  className?: string
}

export default function TransformingButton({
  href,
  children,
  variant = "primary",
  className = "",
}: TransformingButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get theme-specific colors
  const getThemeColors = () => {
    const baseColors = {
      light: {
        primary: { bg: "#dc2626", hover: "#b91c1c", glow: "rgba(220, 38, 38, 0.3)" },
        text: "#ffffff",
      },
      dark: {
        primary: { bg: "#ef4444", hover: "#dc2626", glow: "rgba(239, 68, 68, 0.5)" },
        text: "#ffffff",
      },
      optimus: {
        primary: { bg: "#dc2626", hover: "#b91c1c", glow: "rgba(220, 38, 38, 0.6)" },
        text: "#ffffff",
      },
      bumblebee: {
        primary: { bg: "#facc15", hover: "#eab308", glow: "rgba(250, 204, 21, 0.5)" },
        text: "#0c0a09",
      },
      space: {
        primary: { bg: "#a78bfa", hover: "#8b5cf6", glow: "rgba(167, 139, 250, 0.4)" },
        text: "#ffffff",
      },
    }

    return baseColors[theme as keyof typeof baseColors] || baseColors.dark
  }

  const colors = getThemeColors()

  const primaryStyles = {
    backgroundColor: colors.primary.bg,
    color: colors.text,
    boxShadow: `0 0 15px ${colors.primary.glow}`,
  }

  const secondaryStyles = {
    backgroundColor: "transparent",
    color: colors.primary.bg,
    border: `1px solid ${colors.primary.bg}`,
  }

  const currentStyles = variant === "primary" ? primaryStyles : secondaryStyles

  // Hover colors for animation
  const hoverBg = variant === "primary" ? colors.primary.hover : `${colors.primary.bg}15`
  const accentBg = variant === "primary" ? colors.primary.hover : `${colors.primary.bg}20`

  return (
    <Link
      href={href}
      className={`relative overflow-hidden font-medium rounded-md transition-all duration-300 ${className}`}
      style={currentStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 px-6 py-3">{children}</div>

      {/* Transforming parts */}
      <motion.div className="absolute inset-0 z-0" initial="initial" animate={isHovered ? "hover" : "initial"}>
        {/* Top left corner */}
        <motion.div
          className="absolute top-0 left-0 w-1/4 h-1/4"
          style={{ backgroundColor: accentBg }}
          variants={{
            initial: { x: 0, y: 0, rotate: 0 },
            hover: { x: -5, y: -5, rotate: -15 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Top right corner */}
        <motion.div
          className="absolute top-0 right-0 w-1/4 h-1/4"
          style={{ backgroundColor: accentBg }}
          variants={{
            initial: { x: 0, y: 0, rotate: 0 },
            hover: { x: 5, y: -5, rotate: 15 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Bottom left corner */}
        <motion.div
          className="absolute bottom-0 left-0 w-1/4 h-1/4"
          style={{ backgroundColor: accentBg }}
          variants={{
            initial: { x: 0, y: 0, rotate: 0 },
            hover: { x: -5, y: 5, rotate: 15 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Bottom right corner */}
        <motion.div
          className="absolute bottom-0 right-0 w-1/4 h-1/4"
          style={{ backgroundColor: accentBg }}
          variants={{
            initial: { x: 0, y: 0, rotate: 0 },
            hover: { x: 5, y: 5, rotate: -15 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Center piece */}
        <motion.div
          className="absolute inset-0 m-auto w-1/2 h-1/2"
          style={{ backgroundColor: hoverBg }}
          variants={{
            initial: { scale: 0, rotate: 0 },
            hover: { scale: 1, rotate: 45 },
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  )
}
