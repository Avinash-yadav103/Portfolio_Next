"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CuboidIcon as Cube, Layers, Cpu } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import TransformingCube from "@/components/3d/transforming-cube"

export default function CreativeShowcase() {
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
    <section ref={sectionRef} id="creative" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading title="CREATIVE SHOWCASE" subtitle="3D Experiments & Designs" />

        <div className="mt-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* 3D Transforming Cube */}
            <motion.div variants={itemVariants} className="h-[500px] order-2 lg:order-1">
              <TransformingCube />
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="order-1 lg:order-2">
              <h3 className="text-2xl font-orbitron font-bold mb-4">
                Transforming <span className="text-red-500">Cubes</span>
              </h3>
              <p className="text-gray-300 mb-6">
                This interactive 3D showcase demonstrates the core concept of transformation - a fundamental aspect of
                both web development and the Transformers universe. Watch as the cubes assemble and disassemble,
                representing the constant evolution of technology and design.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-md bg-red-500/10 flex items-center justify-center mr-4">
                    <Cube className="text-red-500" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">3D Modeling</h4>
                    <p className="text-gray-400">
                      Creating immersive three-dimensional experiences that bring designs to life with depth and
                      interactivity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-md bg-red-500/10 flex items-center justify-center mr-4">
                    <Layers className="text-red-500" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Animation</h4>
                    <p className="text-gray-400">
                      Crafting fluid motion and transitions that enhance user experience and create memorable
                      interactions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-md bg-red-500/10 flex items-center justify-center mr-4">
                    <Cpu className="text-red-500" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">WebGL & Three.js</h4>
                    <p className="text-gray-400">
                      Leveraging cutting-edge web technologies to render complex 3D graphics directly in the browser.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
