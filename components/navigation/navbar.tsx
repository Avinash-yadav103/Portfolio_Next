"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import ThemeSwitcher from "@/components/theme/theme-switcher"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Creative", href: "#creative" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Only add the event listener if we're in the browser environment
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)

      // Check initial scroll position
      handleScroll()

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) {
    return null
  }

  // Get theme-specific logo color
  const getLogoColor = () => {
    switch (theme) {
      case "optimus":
        return "text-red-500"
      case "bumblebee":
        return "text-yellow-400"
      case "space":
        return "text-purple-400"
      case "light":
        return "text-red-600"
      default:
        return "text-red-500"
    }
  }

  const logoColor = getLogoColor()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      style={{
        backgroundColor: isScrolled ? 'var(--background-glass)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-color)' : 'none',
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="#home" className="flex items-center space-x-2">
            <div className="w-10 h-10 relative">
              <div 
                className="absolute inset-0 rounded-full opacity-20 animate-pulse"
                style={{ backgroundColor: 'var(--primary-color)' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`${logoColor} font-orbitron font-bold text-xl`}>T</span>
              </div>
            </div>
            <span className="font-orbitron text-xl font-bold" style={{ color: 'var(--text-color)' }}>
              <span className={logoColor}>TRANS</span>FORMER
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-orbitron text-sm uppercase tracking-wider transition-colors relative group"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  {item.name}
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--primary-color)' }}
                  />
                </Link>
              ))}
            </div>

            {/* Theme Switcher */}
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeSwitcher />
            <button 
              className="focus:outline-none" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: 'var(--text-color)' }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden"
          style={{
            backgroundColor: 'var(--background-glass)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-orbitron text-sm uppercase tracking-wider transition-colors py-2"
                  style={{ color: 'var(--text-muted)' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
