"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-black border-t border-red-500/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div>
            <Link href="#home" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-red-500 rounded-full opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-red-500 font-orbitron font-bold text-lg">T</span>
                </div>
              </div>
              <span className="font-orbitron text-lg font-bold text-white">
                <span className="text-red-500">TRANS</span>FORMER
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              A creative developer with a passion for building immersive digital experiences.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="mailto:your.email@example.com"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-orbitron text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-orbitron text-lg font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">
                <span className="text-red-500 mr-2">Email:</span> your.email@example.com
              </li>
              <li className="text-gray-400 text-sm">
                <span className="text-red-500 mr-2">Location:</span> City, Country
              </li>
              <li className="text-gray-400 text-sm">
                <span className="text-red-500 mr-2">Availability:</span> Open to opportunities
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Your Name. All rights reserved. <br />
            <span className="text-xs">Designed with a Transformers theme</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
