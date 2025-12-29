"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer 
      className="relative py-12"
      style={{ 
        backgroundColor: 'var(--background-secondary)',
        borderTop: '1px solid var(--border-color)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div>
            <Link href="#home" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 relative">
                <div 
                  className="absolute inset-0 rounded-full opacity-20"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-orbitron font-bold text-lg" style={{ color: 'var(--primary-color)' }}>T</span>
                </div>
              </div>
              <span className="font-orbitron text-lg font-bold" style={{ color: 'var(--text-color)' }}>
                <span style={{ color: 'var(--primary-color)' }}>TRANS</span>FORMER
              </span>
            </Link>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              A creative developer with a passion for building immersive digital experiences.
            </p>
            <div className="flex space-x-4">
              {[Github, Linkedin, Twitter, Mail].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-orbitron text-lg font-bold mb-4" style={{ color: 'var(--text-heading)' }}>Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase()}`} 
                    className="text-sm transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-orbitron text-lg font-bold mb-4" style={{ color: 'var(--text-heading)' }}>Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm" style={{ color: 'var(--text-muted)' }}>
                <span className="mr-2" style={{ color: 'var(--primary-color)' }}>Email:</span> your.email@example.com
              </li>
              <li className="text-sm" style={{ color: 'var(--text-muted)' }}>
                <span className="mr-2" style={{ color: 'var(--primary-color)' }}>Location:</span> City, Country
              </li>
              <li className="text-sm" style={{ color: 'var(--text-muted)' }}>
                <span className="mr-2" style={{ color: 'var(--primary-color)' }}>Availability:</span> Open to opportunities
              </li>
            </ul>
          </div>
        </div>

        <div 
          className="mt-8 pt-8 text-center"
          style={{ borderTop: '1px solid var(--border-color)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {currentYear} Your Name. All rights reserved. <br />
            <span className="text-xs">Designed with a Transformers theme</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
