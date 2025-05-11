"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"

export default function GlitchEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Only run animations after component is mounted
    if (!isMounted) return
    if (!containerRef.current || !imageRef.current) return

    const container = containerRef.current
    const image = imageRef.current

    // Create glitch elements
    const glitch1 = document.createElement("div")
    const glitch2 = document.createElement("div")

    glitch1.className = "absolute inset-0 overflow-hidden"
    glitch2.className = "absolute inset-0 overflow-hidden"

    const img1 = document.createElement("img")
    const img2 = document.createElement("img")

    img1.src = "/images/autobot-logo.png"
    img2.src = "/images/autobot-logo.png"

    img1.className = "w-full h-full object-contain"
    img2.className = "w-full h-full object-contain"

    glitch1.appendChild(img1)
    glitch2.appendChild(img2)

    container.appendChild(glitch1)
    container.appendChild(glitch2)

    // Glitch animation timeline
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    })

    // Random glitch function
    const glitchEffect = () => {
      const duration = 0.1
      const offset = 10

      tl.to(glitch1, {
        x: gsap.utils.random(-offset, offset),
        y: gsap.utils.random(-offset, offset),
        opacity: 0.8,
        duration: duration,
        ease: "power1.inOut",
      })
        .to(
          glitch2,
          {
            x: gsap.utils.random(-offset, offset),
            y: gsap.utils.random(-offset, offset),
            opacity: 0.8,
            duration: duration,
            ease: "power1.inOut",
          },
          "<",
        )
        .to(
          image,
          {
            x: gsap.utils.random(-offset / 2, offset / 2),
            y: gsap.utils.random(-offset / 2, offset / 2),
            duration: duration,
            ease: "power1.inOut",
          },
          "<",
        )
        .to([glitch1, glitch2, image], {
          x: 0,
          y: 0,
          opacity: 1,
          duration: duration,
          ease: "power1.inOut",
        })
    }

    // Add multiple glitch effects
    for (let i = 0; i < 5; i++) {
      tl.add(glitchEffect, i * 0.3)
    }

    // Cleanup
    return () => {
      tl.kill()
      if (container.contains(glitch1)) container.removeChild(glitch1)
      if (container.contains(glitch2)) container.removeChild(glitch2)
    }
  }, [isMounted])

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <Image ref={imageRef} src="/images/autobot-logo.png" alt="Autobot Logo" fill className="object-contain" />
    </div>
  )
}
