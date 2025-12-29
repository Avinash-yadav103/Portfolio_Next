"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Monitor, Sparkles, Zap, Rocket } from "lucide-react"

const themes = [
  { 
    id: "system", 
    name: "System", 
    icon: Monitor,
    color: "bg-gray-500",
    gradient: "from-gray-400 to-gray-600",
    description: "Follow system"
  },
  { 
    id: "light", 
    name: "Light", 
    icon: Sun,
    color: "bg-amber-400",
    gradient: "from-amber-300 to-orange-400",
    description: "Bright & clean"
  },
  { 
    id: "dark", 
    name: "Dark", 
    icon: Moon,
    color: "bg-slate-700",
    gradient: "from-slate-600 to-slate-800",
    description: "Easy on eyes"
  },
  { 
    id: "optimus", 
    name: "Optimus Prime", 
    icon: Sparkles,
    color: "bg-red-500",
    gradient: "from-red-500 to-blue-600",
    description: "Heroic theme"
  },
  { 
    id: "bumblebee", 
    name: "Bumblebee", 
    icon: Zap,
    color: "bg-yellow-400",
    gradient: "from-yellow-300 to-yellow-500",
    description: "Energetic"
  },
  { 
    id: "space", 
    name: "Space", 
    icon: Rocket,
    color: "bg-purple-500",
    gradient: "from-purple-400 to-indigo-600",
    description: "Cosmic vibes"
  },
]

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-24 h-10 rounded-md bg-black/20 backdrop-blur-sm border border-gray-700 animate-pulse" />
    )
  }

  const currentTheme = themes.find((t) => t.id === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-theme-glass border border-theme backdrop-blur-md hover:border-theme-hover transition-all duration-300"
        style={{
          borderColor: 'var(--border-color)',
          backgroundColor: 'var(--background-glass)',
        }}
      >
        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center`}>
          <CurrentIcon size={12} className="text-white" />
        </div>
        <span className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>
          {currentTheme.name}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4"
          style={{ color: 'var(--text-muted)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 rounded-xl backdrop-blur-xl border shadow-2xl z-50 overflow-hidden"
            style={{
              backgroundColor: 'var(--background-glass)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Select Theme
              </div>
              <div className="space-y-1">
                {themes.map((themeOption) => {
                  const Icon = themeOption.icon
                  const isSelected = theme === themeOption.id
                  
                  return (
                    <motion.button
                      key={themeOption.id}
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        setTheme(themeOption.id)
                        setIsOpen(false)
                      }}
                      className={`flex items-center w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                        isSelected 
                          ? "bg-gradient-to-r opacity-100" 
                          : "hover:bg-white/10"
                      }`}
                      style={{
                        background: isSelected 
                          ? `linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)`
                          : undefined,
                      }}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${themeOption.gradient} flex items-center justify-center mr-3 shadow-lg`}>
                        <Icon size={16} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div 
                          className="font-medium text-sm"
                          style={{ color: isSelected ? '#ffffff' : 'var(--text-color)' }}
                        >
                          {themeOption.name}
                        </div>
                        <div 
                          className="text-xs"
                          style={{ color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}
                        >
                          {themeOption.description}
                        </div>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-white"
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
