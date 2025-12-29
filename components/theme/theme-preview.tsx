"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Palette } from "lucide-react"

const themes = [
  { 
    id: "light", 
    name: "Light", 
    colors: ["#f9fafb", "#dc2626", "#111827"],
    description: "Clean and bright, professional look"
  },
  { 
    id: "dark", 
    name: "Dark", 
    colors: ["#000000", "#ef4444", "#ffffff"],
    description: "Easy on the eyes, sleek appearance"
  },
  { 
    id: "optimus", 
    name: "Optimus Prime", 
    colors: ["#0a0a14", "#dc2626", "#1e40af"],
    description: "Heroic red & blue inspired by the leader"
  },
  { 
    id: "bumblebee", 
    name: "Bumblebee", 
    colors: ["#0c0a09", "#facc15", "#fafaf9"],
    description: "Energetic yellow & black combination"
  },
  { 
    id: "space", 
    name: "Space", 
    colors: ["#6b5b95", "#a78bfa", "#f5f3ff"],
    description: "Neumorphic purple cosmic design"
  },
]

export default function ThemePreview() {
  const { theme, setTheme } = useTheme()

  return (
    <div 
      className="min-h-screen py-20 px-4"
      style={{ 
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)'
      }}
    >
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 mb-8 transition-colors"
          style={{ color: 'var(--primary-color)' }}
        >
          <ArrowLeft size={20} />
          Back to Portfolio
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Palette size={40} style={{ color: 'var(--primary-color)' }} />
          </div>
          <h1 
            className="text-4xl font-bold font-orbitron mb-4"
            style={{ color: 'var(--text-heading)' }}
          >
            Theme Gallery
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Preview and select your preferred theme
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((t) => (
            <motion.button
              key={t.id}
              onClick={() => setTheme(t.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-2xl transition-all duration-300 text-left ${
                theme === t.id ? 'ring-2' : ''
              }`}
              style={{
                backgroundColor: 'var(--background-card)',
                borderColor: theme === t.id ? 'var(--primary-color)' : 'var(--border-color)',
                border: '1px solid var(--border-color)',
                boxShadow: theme === t.id ? 'var(--shadow-glow)' : 'var(--shadow-md)',
              }}
            >
              {/* Color Preview */}
              <div className="flex gap-2 mb-4">
                {t.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border border-white/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <h3 
                className="font-bold font-orbitron mb-2"
                style={{ color: 'var(--text-heading)' }}
              >
                {t.name}
              </h3>
              <p 
                className="text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                {t.description}
              </p>

              {theme === t.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/simple"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all"
            style={{
              backgroundColor: 'var(--primary-color)',
              color: '#ffffff',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            View Simple Space Portfolio →
          </Link>
        </div>
      </div>
    </div>
  )
}
