"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, Calendar, ChevronRight } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { experiences } from "@/data/experience-data"

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section ref={sectionRef} id="experience" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading title="EXPERIENCE" subtitle="My Professional Journey" />

        <div className="mt-12 max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-red-500/30 transform md:translate-x-px"></div>

            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""} mb-12`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-red-500 border-4 border-black transform -translate-x-1/2 z-10"></div>

                {/* Content */}
                <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="p-6 border border-red-500/30 rounded-lg bg-black/50 backdrop-blur-sm hover:border-red-500 transition-colors">
                    <div className="flex items-center mb-2">
                      <Briefcase className="text-red-500 mr-2" size={18} />
                      <h3 className="text-xl font-orbitron font-bold">{experience.role}</h3>
                    </div>
                    <h4 className="text-lg text-gray-300 mb-2">{experience.company}</h4>
                    <div className="flex items-center text-gray-400 text-sm mb-4">
                      <Calendar className="mr-2" size={14} />
                      <span>{experience.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {experience.responsibilities.map((responsibility, respIndex) => (
                        <li key={respIndex} className="flex items-start text-gray-300 text-sm">
                          <ChevronRight className="text-red-500 mt-1 mr-2 flex-shrink-0" size={14} />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
