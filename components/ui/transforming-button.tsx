"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
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

  const primaryColors = {
    bg: "bg-red-500",
    hoverBg: "bg-red-600",
    shadow: "shadow-[0_0_15px_rgba(239,68,68,0.5)]",
    text: "text-white",
    border: "border-red-500",
  }

  const secondaryColors = {
    bg: "bg-transparent",
    hoverBg: "bg-red-500/10",
    shadow: "",
    text: "text-red-500",
    border: "border border-red-500",
  }

  const colors = variant === "primary" ? primaryColors : secondaryColors

  return (
    <Link
      href={href}
      className={`relative overflow-hidden ${colors.bg} ${colors.text} ${colors.border} ${colors.shadow} font-medium rounded-md transition-colors ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 px-6 py-3">{children}</div>

      {/* Transforming parts */}
      <motion.div className="absolute inset-0 z-0" initial="initial" animate={isHovered ? "hover" : "initial"}>
        {/* Top left corner */}
        <motion.div
          className={`absolute top-0 left-0 w-1/4 h-1/4 ${variant === "primary" ? "bg-red-600" : "bg-red-500/20"}`}
          variants={{
            initial: { x: 0, y: 0, rotate: 0 },
            hover: { x: -5, y: -5, rotate: -15 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Top right corner */}
        <motion.div
          className={`absolute top-0 right-0 w-1/4 h-1/4 ${variant === "primary" ? "bg-red-600" : "bg-red-500/20"}`}
          variants={{
            initial: { x: 0, y: 0, rotate: 0 },
            hover: { x: 5, y: -5, rotate: 15 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Bottom left corner */}
        <motion.div
          className={`absolute bottom-0 left-0 w-1/4 h-1/4 ${variant === "primary" ? "bg-red-600" : "bg-red-500/20"}`}
          variants={{
            initial: { x: 0, y: 0, rotate: 0 },
            hover: { x: -5, y: 5, rotate: 15 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Bottom right corner */}
        <motion.div
          className={`absolute bottom-0 right-0 w-1/4 h-1/4 ${variant === "primary" ? "bg-red-600" : "bg-red-500/20"}`}
          variants={{
            initial: { x: 0, y: 0, rotate: 0 },
            hover: { x: 5, y: 5, rotate: -15 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Center piece */}
        <motion.div
          className={`absolute inset-0 m-auto w-1/2 h-1/2 ${variant === "primary" ? "bg-red-700" : "bg-red-500/30"}`}
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
