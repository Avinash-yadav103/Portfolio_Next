"use client"

import { useState } from "react"
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
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Briefcase,
  GraduationCap
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Star Background Component
const StarField = () => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Constellation Lines SVG
const ConstellationLines = () => (
  <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-30 z-0">
    <defs>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    {/* Decorative constellation lines */}
    <motion.circle cx="20%" cy="30%" r="3" fill="#c4b5fd" opacity="0.5" />
    <motion.circle cx="80%" cy="20%" r="2" fill="#c4b5fd" opacity="0.4" />
    <motion.circle cx="70%" cy="60%" r="3" fill="#c4b5fd" opacity="0.5" />
    <motion.circle cx="30%" cy="70%" r="2" fill="#c4b5fd" opacity="0.4" />
    <motion.path
      d="M20% 30% Q 50% 20% 80% 20%"
      stroke="url(#lineGrad)"
      strokeWidth="1"
      fill="none"
      strokeDasharray="5,5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 3, ease: "easeInOut" }}
    />
  </svg>
)

// Neumorphic Card - matching the reference purple style
const NeumorphicCard = ({ 
  children, 
  className = "", 
  variant = "raised"
}: { 
  children: React.ReactNode
  className?: string
  variant?: "raised" | "inset" | "bubble" | "bubble-right"
}) => {
  const variants = {
    raised: "bg-[#7c6ba8]/80 backdrop-blur-sm shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(255,255,255,0.08)] border border-[#9d8ec9]/30",
    inset: "bg-[#6b5a95]/50 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.25),inset_-4px_-4px_8px_rgba(255,255,255,0.05)] border border-[#8b7ab8]/20",
    bubble: "bg-[#f0eef5]/95 text-[#4a3f6b] shadow-[4px_4px_10px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.8)]",
    "bubble-right": "bg-[#7c6ba8]/90 text-white shadow-[4px_4px_10px_rgba(0,0,0,0.25),-2px_-2px_6px_rgba(255,255,255,0.08)]"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-[24px] transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Neumorphic Button
const NeumorphicButton = ({ 
  children, 
  className = "",
  variant = "filled"
}: { 
  children: React.ReactNode
  className?: string
  variant?: "filled" | "outline"
}) => {
  const variants = {
    filled: "bg-[#7c6ba8] text-white shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.08)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.35),-6px_-6px_12px_rgba(255,255,255,0.1)]",
    outline: "bg-transparent text-white border-2 border-[#a78bfa]/50 hover:bg-[#a78bfa]/10"
  }

  return (
    <button className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

// Navigation Icon
const NavIcon = ({ icon: Icon, active = false }: { icon: any; active?: boolean }) => (
  <div
    className={`p-3.5 rounded-2xl transition-all duration-300 ${
      active
        ? "bg-white/20 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.08)]"
        : "shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(255,255,255,0.05)] hover:bg-white/10"
    }`}
  >
    <Icon size={22} className={active ? "text-white" : "text-white/70"} />
  </div>
)

// Project Image Card
const ProjectCard = ({ gradient }: { gradient: string }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className={`aspect-square rounded-2xl overflow-hidden relative cursor-pointer shadow-[4px_4px_10px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] border border-white/10`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIyIiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC4zIi8+PGNpcmNsZSBjeD0iMjAiIGN5PSIzMCIgcj0iMSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMiIvPjxjaXJjbGUgY3g9IjgwIiBjeT0iNzAiIHI9IjEuNSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMjUiLz48L3N2Zz4=')] opacity-60" />
    <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
      <ArrowRight size={12} className="text-white" />
    </div>
  </motion.div>
)

// Skills Data
const skills = ["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "Three.js"]

// Projects Data  
const projects = [
  { gradient: "from-slate-800 via-slate-700 to-slate-900" }, // Black hole
  { gradient: "from-blue-900 via-purple-800 to-indigo-900" }, // Galaxy
  { gradient: "from-violet-600 via-purple-700 to-fuchsia-800" }, // Purple space
  { gradient: "from-gray-700 via-slate-600 to-gray-800" }, // Planet
  { gradient: "from-cyan-600 via-teal-500 to-emerald-600" }, // Comet
  { gradient: "from-purple-800 via-violet-700 to-indigo-800" }, // Nebula
]

export default function SpacePortfolio() {
  const [activeNav, setActiveNav] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div 
      className="min-h-screen text-white relative overflow-x-hidden"
      style={{
        background: "linear-gradient(160deg, #6b5a95 0%, #7c6ba8 40%, #8d7cb9 70%, #9e8dca 100%)",
      }}
    >
      <StarField />
      <ConstellationLines />

      {/* Back to Main */}
      <Link 
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all text-sm"
      >
        <ArrowRight size={16} className="rotate-180" />
        Back to Main
      </Link>

      {/* Main Content */}
      <div className="relative z-10 max-w-lg mx-auto px-4 py-6 pb-20">
        
        {/* Search Bar */}
        <NeumorphicCard variant="inset" className="p-3.5 mt-12 mb-4">
          <div className="flex items-center gap-3">
            <Search size={18} className="text-white/50" />
            <input
              type="text"
              placeholder="Search my portfolio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 outline-none text-white placeholder-white/40 text-sm"
            />
          </div>
        </NeumorphicCard>

        {/* Logo */}
        <div className="flex justify-end mb-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#7c3aed] flex items-center justify-center shadow-lg">
            <Code size={20} className="text-white" />
          </div>
        </div>

        {/* Hero Card */}
        <NeumorphicCard className="p-5 mb-4 relative overflow-hidden">
          {/* Decorative corner curve */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#9d8ec9]/40 to-transparent rounded-bl-[60px]" />
          
          <div className="flex gap-4">
            {/* Left content */}
            <div className="flex-1 space-y-2 relative z-10">
              <p className="text-[#d4c6ff] text-[10px] font-bold tracking-[0.2em] uppercase">
                Portfolio × Space Edition
              </p>
              <div>
                <h1 className="text-3xl font-extrabold text-white leading-none tracking-tight">
                  ABOUT
                </h1>
                <p className="text-2xl font-light italic text-[#e9d5ff]">
                  Developer
                </p>
                <p className="text-[10px] text-white/50 tracking-wider mt-1 uppercase">
                  Your Name Here
                </p>
              </div>
              
              <div className="flex gap-2 pt-3">
                <NeumorphicButton variant="outline" className="text-xs px-4 py-2">
                  Resume
                </NeumorphicButton>
                <NeumorphicButton variant="filled" className="text-xs px-4 py-2">
                  Contact
                </NeumorphicButton>
              </div>
            </div>
            
            {/* Right - Description card */}
            <div className="w-[45%] space-y-2">
              <h3 className="text-sm font-bold text-white">WHO AM I...</h3>
              <p className="text-[11px] text-white/80 leading-relaxed">
                A passionate developer crafting digital experiences. Specializing in modern web technologies with focus on creating immersive user interfaces.
              </p>
            </div>
          </div>
          
          {/* Floating astronaut placeholder */}
          <motion.div
            className="absolute -right-2 top-1/2 -translate-y-1/2"
            animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-16 h-20 rounded-2xl bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <User size={32} className="text-white/50" />
            </div>
          </motion.div>
        </NeumorphicCard>

        {/* Navigation Bar */}
        <NeumorphicCard className="p-3 mb-4">
          <div className="flex justify-around items-center">
            {[
              { icon: Home, id: "home" },
              { icon: Grid3X3, id: "projects" },
              { icon: Settings, id: "skills" },
              { icon: User, id: "about" },
            ].map((item) => (
              <button key={item.id} onClick={() => setActiveNav(item.id)}>
                <NavIcon icon={item.icon} active={activeNav === item.id} />
              </button>
            ))}
          </div>
        </NeumorphicCard>

        {/* Section Title */}
        <div className="flex items-center justify-center my-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
          <span className="px-4 text-[10px] font-bold tracking-[0.15em] text-white/70 uppercase">
            Brief About My Work
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
        </div>

        {/* Chat-style info section */}
        <div className="space-y-3 mb-5">
          {/* Left bubble - About */}
          <div className="flex items-start gap-3">
            <NeumorphicCard variant="bubble" className="p-4 max-w-[75%] rounded-tl-sm">
              <p className="text-[11px] leading-relaxed">
                I build modern web applications using React, Next.js, and TypeScript. 
                My focus is on creating seamless user experiences with attention to detail 
                and performance optimization.
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-[#6b5b95]">
                <ArrowRight size={12} />
                <span className="text-[10px] font-medium">View my projects...</span>
              </div>
            </NeumorphicCard>
          </div>

          {/* Right bubble with astronaut */}
          <div className="flex items-start justify-end gap-3">
            <NeumorphicCard variant="bubble-right" className="p-3 max-w-[50%] rounded-tr-sm">
              <div className="flex items-center gap-2">
                <ArrowRight size={12} />
                <span className="text-[10px]">Let&apos;s connect!</span>
              </div>
            </NeumorphicCard>
            {/* Floating rocket astronaut */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center"
            >
              <Rocket size={20} className="text-white/70 -rotate-45" />
            </motion.div>
          </div>

          {/* Experience bubble */}
          <div className="flex items-start gap-3">
            <NeumorphicCard variant="bubble" className="p-4 max-w-[80%] rounded-tl-sm">
              <p className="text-[11px] leading-relaxed">
                With years of experience in frontend development, I&apos;ve worked on diverse 
                projects ranging from e-commerce platforms to interactive dashboards. 
                Currently exploring 3D web experiences and AI integrations.
              </p>
            </NeumorphicCard>
          </div>
        </div>

        {/* Scroll Button */}
        <div className="flex justify-center my-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#7c6ba8] text-white font-bold tracking-wider text-sm shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(255,255,255,0.08)]"
          >
            SCROLL
            <ChevronDown size={18} />
          </motion.button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} gradient={project.gradient} />
          ))}
        </div>

        {/* Add more button + Rocket */}
        <div className="flex items-center justify-between px-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-[#7c6ba8] flex items-center justify-center shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(255,255,255,0.08)]"
          >
            <span className="text-2xl text-white/80">+</span>
          </motion.button>
          
          {/* 3D Rocket decoration */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Rocket size={48} className="text-white/40 rotate-[30deg]" />
          </motion.div>
        </div>

        {/* Skills Section */}
        <NeumorphicCard className="p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#7c3aed] flex items-center justify-center">
              <Briefcase size={18} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Skills & Technologies</h4>
              <p className="text-[10px] text-white/60">What I work with</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span 
                key={i}
                className="px-3 py-1.5 rounded-full text-[10px] font-medium bg-white/10 text-white/80 border border-white/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </NeumorphicCard>

        {/* Education Card */}
        <NeumorphicCard className="p-5 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#7c3aed] flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Education</h4>
              <p className="text-[10px] text-white/60">B.Tech in Computer Science</p>
            </div>
          </div>
        </NeumorphicCard>

        {/* Contact Section */}
        <NeumorphicCard className="p-5 mb-5">
          <h4 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
            <Mail size={16} className="text-[#c4b5fd]" />
            Get In Touch
          </h4>
          
          <div className="space-y-3">
            <NeumorphicCard variant="inset" className="p-3">
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent w-full outline-none text-white placeholder-white/40 text-xs"
              />
            </NeumorphicCard>
            <NeumorphicCard variant="inset" className="p-3">
              <textarea
                placeholder="Your message..."
                rows={3}
                className="bg-transparent w-full outline-none text-white placeholder-white/40 text-xs resize-none"
              />
            </NeumorphicCard>
            <button className="w-full py-3 rounded-xl bg-[#7c6ba8] text-white font-semibold text-sm shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(255,255,255,0.08)] hover:shadow-[6px_6px_14px_rgba(0,0,0,0.35),-6px_-6px_14px_rgba(255,255,255,0.1)] transition-all">
              Send Message
            </button>
          </div>
        </NeumorphicCard>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-6">
          {[Github, Linkedin, Mail, ExternalLink].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ y: -3 }}
              className="w-11 h-11 rounded-xl bg-[#7c6ba8] flex items-center justify-center shadow-[4px_4px_8px_rgba(0,0,0,0.25),-4px_-4px_8px_rgba(255,255,255,0.06)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(255,255,255,0.08)] transition-shadow"
            >
              <Icon size={18} className="text-white/80" />
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase">
            Created by <span className="text-[#c4b5fd] font-semibold">Your Name</span>
          </p>
        </div>
      </div>
    </div>
  )
}
