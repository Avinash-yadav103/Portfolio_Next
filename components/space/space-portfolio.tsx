"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  GraduationCap,
  Star,
  Sparkles,
  Globe,
  Zap
} from "lucide-react"
import Link from "next/link"

// =============================================================================
// ANIMATED SPACE BACKGROUND
// =============================================================================

const SpaceBackground = () => {
  // Generate stars with different sizes and animations
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }))

  // Shooting stars
  const shootingStars = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 4 + Math.random() * 2,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0a1e] via-[#1a1035] to-[#251650]" />
      
      {/* Nebula effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${10 + Math.random() * 30}%`,
            left: "-5%",
          }}
          animate={{
            x: ["0vw", "120vw"],
            y: ["0vh", "40vh"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 8,
            ease: "easeIn",
          }}
        >
          <div className="w-20 h-0.5 bg-gradient-to-l from-white to-transparent -translate-x-full" />
        </motion.div>
      ))}

      {/* Constellation lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="constellationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          d="M100,100 L200,150 L350,120 L500,180 L600,100"
          stroke="url(#constellationGrad)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
        <motion.path
          d="M700,200 L800,150 L900,220 L1000,180"
          stroke="url(#constellationGrad)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  )
}

// =============================================================================
// NEUMORPHIC COMPONENTS
// =============================================================================

const GlassCard = ({ 
  children, 
  className = "", 
  variant = "default",
  animate = true
}: { 
  children: React.ReactNode
  className?: string
  variant?: "default" | "dark" | "light" | "glow"
  animate?: boolean
}) => {
  const variants = {
    default: "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
    dark: "bg-black/20 backdrop-blur-xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
    light: "bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] text-slate-800",
    glow: "bg-purple-500/10 backdrop-blur-xl border border-purple-400/20 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
  }

  const content = (
    <div className={`rounded-3xl ${variants[variant]} ${className}`}>
      {children}
    </div>
  )

  if (!animate) return content

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.div>
  )
}

const SpaceButton = ({ 
  children, 
  className = "",
  variant = "primary",
  onClick
}: { 
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "ghost"
  onClick?: () => void
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20",
    ghost: "text-purple-300 hover:text-white hover:bg-white/10"
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  )
}

// Navigation Icon
const NavIcon = ({ icon: Icon, active = false, label }: { icon: any; active?: boolean; label: string }) => (
  <motion.div 
    className="flex flex-col items-center gap-1"
    whileHover={{ y: -2 }}
  >
    <div
      className={`p-3.5 rounded-2xl transition-all duration-300 ${
        active
          ? "bg-purple-500/30 border border-purple-400/30 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          : "bg-white/5 border border-white/10 hover:bg-white/10"
      }`}
    >
      <Icon size={20} className={active ? "text-purple-300" : "text-white/60"} />
    </div>
    <span className={`text-[10px] ${active ? "text-purple-300" : "text-white/40"}`}>{label}</span>
  </motion.div>
)

// Planet decoration
const FloatingPlanet = ({ size, color, x, y, delay = 0 }: { size: number; color: string; x: string; y: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full ${color}`}
    style={{ width: size, height: size, left: x, top: y }}
    animate={{ 
      y: [0, -10, 0],
      rotate: [0, 5, 0]
    }}
    transition={{ 
      duration: 6 + delay, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
  >
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-1/3 rounded-b-full bg-black/20" />
  </motion.div>
)

// Project Card
const ProjectCard = ({ 
  title, 
  gradient,
  icon: Icon = Star
}: { 
  title: string
  gradient: string
  icon?: any
}) => (
  <motion.div
    whileHover={{ scale: 1.03, y: -3 }}
    className="aspect-square rounded-2xl overflow-hidden relative cursor-pointer group"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
    
    {/* Stars overlay */}
    <div className="absolute inset-0 opacity-40">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
        />
      ))}
    </div>
    
    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
      <Icon size={32} className="text-white" />
    </div>
    
    <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <ArrowRight size={14} className="text-white" />
    </div>
  </motion.div>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const skills = [
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "🟢" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Three.js", icon: "🎲" },
]

const projects = [
  { title: "Galaxy App", gradient: "from-slate-900 via-purple-900 to-slate-900", icon: Globe },
  { title: "Nebula", gradient: "from-blue-900 via-indigo-800 to-purple-900", icon: Sparkles },
  { title: "Cosmos", gradient: "from-violet-900 via-purple-800 to-fuchsia-900", icon: Star },
  { title: "Aurora", gradient: "from-emerald-900 via-teal-800 to-cyan-900", icon: Zap },
  { title: "Nova", gradient: "from-rose-900 via-pink-800 to-purple-900", icon: Rocket },
]

export default function SpacePortfolio() {
  const [activeNav, setActiveNav] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      <SpaceBackground />

      {/* Floating planets decoration */}
      <FloatingPlanet size={60} color="bg-gradient-to-br from-purple-400 to-purple-600" x="5%" y="20%" delay={0} />
      <FloatingPlanet size={40} color="bg-gradient-to-br from-blue-400 to-indigo-600" x="85%" y="15%" delay={2} />
      <FloatingPlanet size={30} color="bg-gradient-to-br from-pink-400 to-rose-600" x="90%" y="70%" delay={1} />

      {/* Back to Main */}
      <Link href="/">
        <motion.div
          whileHover={{ x: -3 }}
          className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm cursor-pointer"
        >
          <ArrowRight size={16} className="rotate-180" />
          <span>Back to Main</span>
        </motion.div>
      </Link>

      {/* Main Content */}
      <div className="relative z-10 max-w-lg mx-auto px-4 py-8 pb-20">
        
        {/* Search Bar */}
        <GlassCard variant="dark" className="p-3.5 mt-12 mb-5">
          <div className="flex items-center gap-3">
            <Search size={18} className="text-purple-300/50" />
            <input
              type="text"
              placeholder="Explore the cosmos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 outline-none text-white placeholder-white/30 text-sm"
            />
          </div>
        </GlassCard>

        {/* Logo */}
        <div className="flex justify-end mb-4">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30"
          >
            <Rocket size={22} className="text-white -rotate-45" />
          </motion.div>
        </div>

        {/* Hero Card */}
        <GlassCard variant="glow" className="p-6 mb-5 relative overflow-hidden">
          {/* Animated rings */}
          <div className="absolute -right-10 -top-10 w-40 h-40 border border-purple-400/20 rounded-full" />
          <div className="absolute -right-5 -top-5 w-32 h-32 border border-purple-400/10 rounded-full" />
          
          <div className="relative z-10">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-purple-300/80 text-[10px] font-bold tracking-[0.25em] uppercase mb-2"
            >
              🚀 Portfolio × Space Edition
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-4xl font-extrabold text-white leading-none tracking-tight mb-1">
                EXPLORER
              </h1>
              <p className="text-xl font-light text-purple-200/80 italic">
                Developer & Designer
              </p>
            </motion.div>

            <p className="text-white/60 text-sm mt-4 leading-relaxed max-w-xs">
              Navigating the digital universe, crafting stellar experiences one pixel at a time.
            </p>
            
            <div className="flex gap-3 mt-5">
              <SpaceButton variant="primary">
                View Work
              </SpaceButton>
              <SpaceButton variant="secondary">
                Resume
              </SpaceButton>
            </div>
          </div>

          {/* Floating astronaut */}
          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2"
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-20 h-24 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <User size={36} className="text-white/40" />
            </div>
          </motion.div>
        </GlassCard>

        {/* Navigation */}
        <GlassCard className="p-4 mb-5">
          <div className="flex justify-around items-center">
            {[
              { icon: Home, id: "home", label: "Home" },
              { icon: Grid3X3, id: "projects", label: "Projects" },
              { icon: Code, id: "skills", label: "Skills" },
              { icon: User, id: "about", label: "About" },
            ].map((item) => (
              <button key={item.id} onClick={() => setActiveNav(item.id)}>
                <NavIcon icon={item.icon} active={activeNav === item.id} label={item.label} />
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Section Divider */}
        <div className="flex items-center justify-center my-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
          <Sparkles size={14} className="text-purple-400/50 mx-4" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
        </div>

        {/* About Bubbles */}
        <div className="space-y-4 mb-6">
          {/* Left bubble */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard variant="light" className="p-5 max-w-[85%] rounded-tl-sm">
              <p className="text-sm leading-relaxed text-slate-700">
                I specialize in building modern web applications using <span className="font-semibold text-purple-600">React</span>, <span className="font-semibold text-purple-600">Next.js</span>, and <span className="font-semibold text-purple-600">TypeScript</span>. 
                My mission is creating seamless digital experiences that feel out of this world.
              </p>
              <div className="flex items-center gap-2 mt-3 text-purple-600">
                <ArrowRight size={14} />
                <span className="text-xs font-medium">Explore my universe...</span>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right bubble with rocket */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-start justify-end gap-3"
          >
            <GlassCard variant="dark" className="p-4 max-w-[60%] rounded-tr-sm">
              <div className="flex items-center gap-2 text-purple-300">
                <Star size={14} className="fill-current" />
                <span className="text-sm">Ready for takeoff!</span>
              </div>
            </GlassCard>
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-indigo-500/30 backdrop-blur-sm flex items-center justify-center border border-purple-400/20"
            >
              <Rocket size={24} className="text-purple-300" />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { value: "5+", label: "Years Exp" },
            { value: "50+", label: "Projects" },
            { value: "∞", label: "Curiosity" },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-purple-300/60 mt-1">{stat.label}</p>
            </GlassCard>
          ))}
        </div>

        {/* Scroll Button */}
        <div className="flex justify-center my-6">
          <SpaceButton variant="primary" className="flex items-center gap-2 px-8 py-3">
            <span className="font-bold tracking-wider">SCROLL</span>
            <ChevronDown size={18} />
          </SpaceButton>
        </div>

        {/* Projects Grid */}
        <div className="mb-5">
          <h3 className="text-sm font-bold text-white/80 mb-4 flex items-center gap-2">
            <Globe size={16} className="text-purple-400" />
            Featured Missions
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {projects.map((project, i) => (
              <ProjectCard key={i} {...project} />
            ))}
            {/* Add more */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
            >
              <span className="text-3xl text-white/30">+</span>
            </motion.div>
          </div>
        </div>

        {/* Rocket Decoration */}
        <div className="flex justify-end mb-6">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Rocket size={56} className="text-white/20 rotate-[30deg]" />
          </motion.div>
        </div>

        {/* Skills */}
        <GlassCard className="p-5 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Briefcase size={18} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Tech Stack</h4>
              <p className="text-[10px] text-white/40">My toolkit for space exploration</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <motion.span 
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-3 py-2 rounded-xl text-xs font-medium bg-purple-500/10 text-purple-200 border border-purple-400/20 flex items-center gap-1.5"
              >
                <span>{skill.icon}</span>
                {skill.name}
              </motion.span>
            ))}
          </div>
        </GlassCard>

        {/* Education */}
        <GlassCard className="p-5 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <GraduationCap size={18} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Education</h4>
              <p className="text-xs text-white/40">B.Tech in Computer Science</p>
            </div>
          </div>
        </GlassCard>

        {/* Contact */}
        <GlassCard className="p-5 mb-6">
          <h4 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
            <Mail size={16} className="text-purple-400" />
            Transmission Center
          </h4>
          
          <div className="space-y-3">
            <GlassCard variant="dark" className="p-3" animate={false}>
              <input
                type="email"
                placeholder="Your email frequency"
                className="bg-transparent w-full outline-none text-white placeholder-white/30 text-sm"
              />
            </GlassCard>
            <GlassCard variant="dark" className="p-3" animate={false}>
              <textarea
                placeholder="Your message to the cosmos..."
                rows={3}
                className="bg-transparent w-full outline-none text-white placeholder-white/30 text-sm resize-none"
              />
            </GlassCard>
            <SpaceButton variant="primary" className="w-full py-3">
              Send Transmission 🚀
            </SpaceButton>
          </div>
        </GlassCard>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { icon: Github, href: "#" },
            { icon: Linkedin, href: "#" },
            { icon: Mail, href: "#" },
            { icon: ExternalLink, href: "#" }
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              whileHover={{ y: -3, scale: 1.1 }}
              className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-400/30 transition-all"
            >
              <item.icon size={18} className="text-white/60" />
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase">
            Crafted among the stars by <span className="text-purple-400 font-semibold">Your Name</span>
          </p>
          <p className="text-white/20 text-[9px] mt-2">🌟 • 🚀 • ✨</p>
        </div>
      </div>
    </div>
  )
}
