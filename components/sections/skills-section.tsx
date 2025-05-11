"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Palette, Database, Globe, Cpu, Layers } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import SkillCube from "@/components/3d/skill-cube"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Code className="text-red-500" size={24} />,
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Tailwind CSS"],
  },
  {
    title: "UI/UX Design",
    icon: <Palette className="text-red-500" size={24} />,
    skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Wireframing", "Prototyping", "User Research"],
  },
  {
    title: "Backend Development",
    icon: <Database className="text-red-500" size={24} />,
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase", "REST API", "GraphQL"],
  },
  {
    title: "Web Technologies",
    icon: <Globe className="text-red-500" size={24} />,
    skills: ["Responsive Design", "Progressive Web Apps", "Web Animations", "SEO", "Web Performance", "Accessibility"],
  },
  {
    title: "Tools & Platforms",
    icon: <Cpu className="text-red-500" size={24} />,
    skills: ["Git", "GitHub", "VS Code", "Webpack", "Vite", "Docker", "Vercel", "Netlify"],
  },
  {
    title: "3D & Animation",
    icon: <Layers className="text-red-500" size={24} />,
    skills: ["Three.js", "GSAP", "Framer Motion", "CSS Animations", "WebGL", "Canvas API"],
  },
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section ref={sectionRef} id="skills" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading title="SKILLS" subtitle="My Technical Level" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mt-12">
          {/* 3D Skill Cube */}
          <div className="lg:col-span-1 h-[400px] order-2 lg:order-1">
            <SkillCube />
          </div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 order-1 lg:order-2"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 border border-red-500/30 rounded-lg bg-black/50 backdrop-blur-sm hover:border-red-500 transition-colors group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-md bg-red-500/10 flex items-center justify-center mr-3 group-hover:bg-red-500/20 transition-colors">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-orbitron font-bold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 text-sm bg-red-500/10 text-gray-300 rounded-md border border-red-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
