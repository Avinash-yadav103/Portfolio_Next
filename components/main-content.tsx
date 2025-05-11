"use client"

import { useState } from "react"
import { storyData } from "@/data/transformers-data"
import { ChevronRight, ChevronDown, Shield, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function MainContent() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null)
    } else {
      setActiveSection(section)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16 relative overflow-hidden rounded-lg border border-blue-500 p-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-5xl font-bold mb-4 text-blue-300">{storyData.intro.title}</h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-8">{storyData.intro.description}</p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md border border-blue-400 hover:bg-blue-700 transition-colors shadow-[0_0_15px_rgba(0,162,255,0.5)]">
              Explore Universe
            </button>
            <button className="px-6 py-3 bg-transparent text-blue-400 rounded-md border border-blue-500 hover:bg-blue-900/30 transition-colors">
              View Timeline
            </button>
          </div>
        </motion.div>

        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Factions Section */}
      <section className="mb-16">
        <div className="flex items-center cursor-pointer mb-4" onClick={() => toggleSection("factions")}>
          <h2 className="text-3xl font-bold text-blue-300">Factions</h2>
          {activeSection === "factions" ? (
            <ChevronDown className="ml-2 text-blue-400" />
          ) : (
            <ChevronRight className="ml-2 text-blue-400" />
          )}
        </div>

        {activeSection === "factions" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Autobots */}
            <div className="p-6 rounded-lg border border-blue-500 bg-blue-900/20 hover:bg-blue-900/30 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-blue-300 flex items-center">
                <Shield className="mr-2" /> Autobots
              </h3>
              <ul className="space-y-2">
                {storyData.factions.autobots.map((autobot, index) => (
                  <li key={index} className="text-blue-100 flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    {autobot}
                  </li>
                ))}
              </ul>
            </div>

            {/* Decepticons */}
            <div className="p-6 rounded-lg border border-purple-500 bg-purple-900/20 hover:bg-purple-900/30 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-purple-300 flex items-center">
                <Zap className="mr-2" /> Decepticons
              </h3>
              <ul className="space-y-2">
                {storyData.factions.decepticons.map((decepticon, index) => (
                  <li key={index} className="text-purple-100 flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    {decepticon}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </section>

      {/* Timeline Section */}
      <section className="mb-16">
        <div className="flex items-center cursor-pointer mb-4" onClick={() => toggleSection("timeline")}>
          <h2 className="text-3xl font-bold text-blue-300">Timeline</h2>
          {activeSection === "timeline" ? (
            <ChevronDown className="ml-2 text-blue-400" />
          ) : (
            <ChevronRight className="ml-2 text-blue-400" />
          )}
        </div>

        {activeSection === "timeline" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-500"></div>

            {storyData.timeline.map((item, index) => (
              <div key={index} className="relative pl-12 pb-8">
                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-blue-900 border-2 border-blue-400 flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                </div>
                <div className="p-4 rounded-lg border border-blue-500 bg-blue-900/20">
                  <h3 className="text-xl font-bold text-blue-300 mb-1">{item.year}</h3>
                  <p className="text-blue-100">{item.event}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Artifacts Section */}
      <section className="mb-16">
        <div className="flex items-center cursor-pointer mb-4" onClick={() => toggleSection("artifacts")}>
          <h2 className="text-3xl font-bold text-blue-300">Artifacts</h2>
          {activeSection === "artifacts" ? (
            <ChevronDown className="ml-2 text-blue-400" />
          ) : (
            <ChevronRight className="ml-2 text-blue-400" />
          )}
        </div>

        {activeSection === "artifacts" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {storyData.artifacts.map((artifact, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-blue-500 bg-blue-900/20 hover:bg-blue-900/30 transition-colors flex items-center justify-center h-32"
              >
                <h3 className="text-xl font-bold text-blue-300 text-center">{artifact}</h3>
              </div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  )
}
