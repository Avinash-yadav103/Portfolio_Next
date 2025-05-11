"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon, Monitor } from "lucide-react"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { id: "system", name: "System", icon: <Monitor size={16} /> },
    { id: "light", name: "Light", icon: <Sun size={16} /> },
    { id: "dark", name: "Dark", icon: <Moon size={16} /> },
    { id: "optimus", name: "Optimus Prime", color: "bg-red-500" },
    { id: "bumblebee", name: "Bumblebee", color: "bg-yellow-400" },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 rounded-md bg-black/20 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-colors"
      >
        {theme === "system" && <Monitor size={16} className="text-gray-300" />}
        {theme === "light" && <Sun size={16} className="text-gray-300" />}
        {theme === "dark" && <Moon size={16} className="text-gray-300" />}
        {theme === "optimus" && <div className="w-4 h-4 rounded-full bg-red-500 border border-gray-700"></div>}
        {theme === "bumblebee" && <div className="w-4 h-4 rounded-full bg-yellow-400 border border-gray-700"></div>}
        <span className="text-sm text-gray-300">{themes.find((t) => t.id === theme)?.name || "Theme"}</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute right-0 mt-2 w-48 rounded-md bg-black/80 backdrop-blur-md border border-gray-700 shadow-lg z-50"
        >
          <div className="py-2">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => {
                  setTheme(themeOption.id)
                  setIsOpen(false)
                }}
                className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-800 transition-colors ${
                  theme === themeOption.id ? "bg-gray-800" : ""
                }`}
              >
                <div className="flex items-center space-x-2">
                  {themeOption.icon ? (
                    themeOption.icon
                  ) : (
                    <div className={`w-4 h-4 rounded-full ${themeOption.color} border border-gray-700`}></div>
                  )}
                  <span className="text-gray-300">{themeOption.name}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
