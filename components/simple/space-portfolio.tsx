"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Home, 
  Grid3X3, 
  Settings, 
  User, 
  Search, 
  ArrowRight, 
  ChevronDown,
  Rocket,
  Star,
  Code,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  Twitter
} from "lucide-react"
import Image from "next/image"

// Neumorphic Card Component
const NeumorphicCard = ({ 
  children, 
  className = "", 
  hover = true,
  variant = "raised"
}: { 
  children: React.ReactNode
  className?: string
  hover?: boolean
  variant?: "raised" | "flat" | "inset"
}) => {
  const baseStyles = "rounded-3xl transition-all duration-300"
  
  const variantStyles = {
    raised: "bg-gradient-to-br from-[#8b7ab8] to-[#6b5b95] shadow-[8px_8px_16px_rgba(0,0,0,0.25),-8px_-8px_16px_rgba(255,255,255,0.1)]",
    flat: "bg-[#7c6aa8]",
    inset: "bg-[#7c6aa8] shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.1)]"
  }

  const hoverStyles = hover 
    ? "hover:shadow-[12px_12px_24px_rgba(0,0,0,0.3),-12px_-12px_24px_rgba(255,255,255,0.15)] hover:-translate-y-1" 
    : ""

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Neumorphic Button Component
const NeumorphicButton = ({ 
  children, 
  className = "",
  variant = "raised",
  onClick
}: { 
  children: React.ReactNode
  className?: string
  variant?: "raised" | "flat" | "icon"
  onClick?: () => void
}) => {
  const baseStyles = "transition-all duration-200 font-medium text-white/90"
  
  const variantStyles = {
    raised: "bg-gradient-to-br from-[#8b7ab8] to-[#6b5b95] rounded-2xl px-6 py-3 shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(255,255,255,0.1)] hover:shadow-[8px_8px_16px_rgba(0,0,0,0.35),-8px_-8px_16px_rgba(255,255,255,0.15)] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.1)]",
    flat: "bg-[#7c6aa8]/50 rounded-xl px-4 py-2 hover:bg-[#8b7ab8]/50",
    icon: "bg-gradient-to-br from-[#8b7ab8] to-[#6b5b95] rounded-xl p-3 shadow-[4px_4px_8px_rgba(0,0,0,0.25),-4px_-4px_8px_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(255,255,255,0.15)]"
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

// Star Background
const StarField = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Navigation Icons
const NavIcon = ({ icon: Icon, active = false }: { icon: any; active?: boolean }) => (
  <div
    className={`p-3 rounded-xl transition-all duration-200 ${
      active
        ? "bg-white/20 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.1)]"
        : "hover:bg-white/10"
    }`}
  >
    <Icon size={20} className="text-white/80" />
  </div>
)

// Project Card
const ProjectCard = ({ 
  title, 
  image, 
  color = "purple" 
}: { 
  title: string
  image?: string
  color?: string
}) => (
  <NeumorphicCard className="relative overflow-hidden group cursor-pointer aspect-square">
    <div className={`absolute inset-0 bg-gradient-to-br ${
      color === "purple" ? "from-purple-500/30 to-indigo-600/30" :
      color === "blue" ? "from-blue-500/30 to-cyan-500/30" :
      "from-pink-500/30 to-rose-500/30"
    }`} />
    {image ? (
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
      />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center">
        <Star className="text-white/20" size={48} />
      </div>
    )}
    <div className="absolute bottom-4 right-4">
      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
        <ArrowRight size={16} className="text-white" />
      </div>
    </div>
  </NeumorphicCard>
)

// Skills Data
const skills = [
  { name: "React", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Next.js", level: 88 },
  { name: "Node.js", level: 80 },
  { name: "Tailwind", level: 95 },
  { name: "Three.js", level: 70 },
]

export default function SpacePortfolio() {
  const [activeNav, setActiveNav] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div 
      className="min-h-screen text-white relative overflow-x-hidden"
      style={{
        background: "linear-gradient(135deg, #6b5b95 0%, #7c6aa8 50%, #8b7ab8 100%)",
      }}
    >
      {/* Star Background */}
      <StarField />

      {/* Main Content */}
      <div className="relative z-10 max-w-md mx-auto px-4 py-6 pb-24 space-y-6">
        
        {/* Search Bar */}
        <NeumorphicCard variant="inset" className="p-4">
          <div className="flex items-center gap-3">
            <Search size={20} className="text-white/50" />
            <input
              type="text"
              placeholder="Search portfolio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 outline-none text-white placeholder-white/40 text-sm"
            />
          </div>
        </NeumorphicCard>

        {/* Logo/Brand */}
        <div className="flex justify-end">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Rocket size={20} className="text-white" />
          </div>
        </div>

        {/* Hero Section */}
        <NeumorphicCard className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-bl-full" />
          
          <div className="flex gap-6">
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <motion.p 
                  className="text-purple-200 text-sm font-medium tracking-wider"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  PORTFOLIO × SPACE THEME
                </motion.p>
                <motion.h1 
                  className="text-4xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    YOUR
                  </span>
                  <br />
                  <span className="text-purple-300 italic font-light">Name</span>
                </motion.h1>
              </div>
              
              <div className="flex gap-2">
                <NeumorphicButton variant="flat">LOGIN</NeumorphicButton>
                <NeumorphicButton variant="raised">VIEW CV</NeumorphicButton>
              </div>
            </div>
            
            <div className="relative">
              {/* Astronaut placeholder */}
              <div className="w-24 h-32 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <User size={64} className="text-white/60" />
                </motion.div>
              </div>
            </div>
          </div>
        </NeumorphicCard>

        {/* About Card */}
        <NeumorphicCard className="p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white/90">ABOUT ME</h3>
            <Code size={20} className="text-purple-300" />
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            A passionate developer who transforms ideas into elegant digital solutions. 
            Specializing in modern web technologies with a focus on creating immersive user experiences.
          </p>
          <div className="flex items-center gap-2 text-purple-300 text-sm">
            <ArrowRight size={16} />
            <span>Learn more about my journey</span>
          </div>
        </NeumorphicCard>

        {/* Navigation Icons */}
        <NeumorphicCard className="p-4">
          <div className="flex justify-between items-center">
            {[
              { icon: Home, id: "home" },
              { icon: Grid3X3, id: "projects" },
              { icon: Settings, id: "settings" },
              { icon: User, id: "profile" },
            ].map((item) => (
              <button key={item.id} onClick={() => setActiveNav(item.id)}>
                <NavIcon icon={item.icon} active={activeNav === item.id} />
              </button>
            ))}
          </div>
        </NeumorphicCard>

        {/* Skills Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white/90">SKILLS</h3>
            <Briefcase size={20} className="text-purple-300" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill, index) => (
              <NeumorphicCard key={skill.name} className="p-4" hover={false}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-white/80">{skill.name}</span>
                  <span className="text-xs text-purple-300">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-2 gap-4">
          <NeumorphicCard className="p-5">
            <p className="text-white/60 text-xs uppercase tracking-wide mb-2">Experience</p>
            <p className="text-2xl font-bold text-white">5+ Years</p>
            <p className="text-purple-300 text-sm mt-2">Professional Development</p>
          </NeumorphicCard>
          
          <NeumorphicCard className="p-5">
            <p className="text-white/60 text-xs uppercase tracking-wide mb-2">Projects</p>
            <p className="text-2xl font-bold text-white">50+</p>
            <p className="text-purple-300 text-sm mt-2">Completed Successfully</p>
          </NeumorphicCard>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center py-4">
          <NeumorphicButton variant="raised" className="flex items-center gap-2">
            <span>SCROLL</span>
            <ChevronDown size={16} />
          </NeumorphicButton>
        </div>

        {/* Projects Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white/90">FEATURED PROJECTS</h3>
            <Star size={20} className="text-purple-300" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <ProjectCard title="Project 1" color="purple" />
            <ProjectCard title="Project 2" color="blue" />
            <ProjectCard title="Project 3" color="pink" />
            <div className="aspect-square flex items-center justify-center">
              <NeumorphicButton variant="icon" className="w-16 h-16 rounded-full">
                <span className="text-2xl">+</span>
              </NeumorphicButton>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <NeumorphicCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Education</h4>
              <p className="text-sm text-white/60">Bachelor's in Computer Science</p>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Graduated with honors, specializing in software engineering and interactive systems design.
          </p>
        </NeumorphicCard>

        {/* Contact Section */}
        <NeumorphicCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white/90">GET IN TOUCH</h3>
            <Mail size={20} className="text-purple-300" />
          </div>
          
          <div className="space-y-4">
            <NeumorphicCard variant="inset" className="p-4">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent w-full outline-none text-white placeholder-white/40 text-sm"
              />
            </NeumorphicCard>
            
            <NeumorphicCard variant="inset" className="p-4">
              <textarea
                placeholder="Your message..."
                rows={3}
                className="bg-transparent w-full outline-none text-white placeholder-white/40 text-sm resize-none"
              />
            </NeumorphicCard>
            
            <NeumorphicButton variant="raised" className="w-full">
              Send Message
            </NeumorphicButton>
          </div>
        </NeumorphicCard>

        {/* Social Links */}
        <div className="flex justify-center gap-4 py-4">
          {[Github, Linkedin, Twitter].map((Icon, index) => (
            <NeumorphicButton key={index} variant="icon">
              <Icon size={20} />
            </NeumorphicButton>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-white/50 text-sm">
            CREATED BY <span className="text-purple-300 font-medium">YOUR NAME</span>
          </p>
        </div>
      </div>
    </div>
  )
}
