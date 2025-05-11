"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Download } from "lucide-react"
import Link from "next/link"
import SectionHeading from "@/components/ui/section-heading"

export default function AboutSection() {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section ref={sectionRef} id="about" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading title="ABOUT ME" subtitle="My Introduction" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12"
        >
          {/* Image */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden border-2 border-red-500/30 transform rotate-3 transition-transform hover:rotate-0 duration-300">
              <Image src="/placeholder.svg?height=400&width=400" alt="Profile" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-orbitron font-bold mb-4">
              Transforming <span className="text-red-500">Ideas</span> into Digital Reality
            </h3>
            <p className="text-gray-300 mb-6">
              I am a passionate frontend developer and designer with a strong focus on creating immersive and
              interactive web experiences. With expertise in modern web technologies and a keen eye for design, I bring
              creative concepts to life through clean code and intuitive user interfaces.
            </p>
            <p className="text-gray-300 mb-6">
              My journey in web development began 5 years ago, and since then, I've worked on various projects ranging
              from corporate websites to interactive web applications. I'm constantly exploring new technologies and
              techniques to enhance my skills and deliver cutting-edge solutions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 border border-red-500/30 rounded-lg bg-black/50 backdrop-blur-sm">
                <h4 className="text-red-500 text-2xl font-bold font-orbitron">5+</h4>
                <p className="text-gray-400 text-sm">Years Experience</p>
              </div>
              <div className="text-center p-4 border border-red-500/30 rounded-lg bg-black/50 backdrop-blur-sm">
                <h4 className="text-red-500 text-2xl font-bold font-orbitron">20+</h4>
                <p className="text-gray-400 text-sm">Projects Completed</p>
              </div>
              <div className="text-center p-4 border border-red-500/30 rounded-lg bg-black/50 backdrop-blur-sm">
                <h4 className="text-red-500 text-2xl font-bold font-orbitron">10+</h4>
                <p className="text-gray-400 text-sm">Happy Clients</p>
              </div>
            </div>

            {/* Download CV button */}
            <Link
              href="/resume.pdf"
              className="inline-flex items-center px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.5)]"
            >
              <Download size={18} className="mr-2" />
              Download CV
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
