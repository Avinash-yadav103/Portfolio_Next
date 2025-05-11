"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function TriangularLoader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Only run animations after component is mounted
    if (!isMounted) return

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
    })

    // Check if elements exist before animating
    const triangleParts = document.querySelectorAll(".triangle-part")
    const triangleCenter = document.querySelector(".triangle-center")

    if (triangleParts.length > 0) {
      tl.to(triangleParts, {
        boxShadow: "0 0 20px #ff0000, 0 0 40px #ff0000",
        duration: 0.8,
        stagger: 0.2,
      }).to(triangleParts, {
        boxShadow: "0 0 5px #ff0000",
        duration: 0.8,
        stagger: 0.2,
      })
    }

    if (triangleCenter) {
      tl.to(triangleCenter, {
        boxShadow: "0 0 30px #ff0000, 0 0 50px #ff0000",
        duration: 0.5,
      }).to(triangleCenter, {
        boxShadow: "0 0 10px #ff0000",
        duration: 0.5,
      })
    }

    return () => {
      tl.kill()
    }
  }, [isMounted])

  return (
    <div ref={containerRef} className="relative w-64 h-64">
      {/* Top triangle */}
      <div
        className="triangle-part absolute w-40 h-40 bg-black border-2 border-red-500"
        style={{
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          boxShadow: "0 0 5px #ff0000",
        }}
      ></div>

      {/* Bottom left triangle */}
      <div
        className="triangle-part absolute w-40 h-40 bg-black border-2 border-red-500"
        style={{
          bottom: 0,
          left: 0,
          clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)",
          boxShadow: "0 0 5px #ff0000",
        }}
      ></div>

      {/* Bottom right triangle */}
      <div
        className="triangle-part absolute w-40 h-40 bg-black border-2 border-red-500"
        style={{
          bottom: 0,
          right: 0,
          clipPath: "polygon(100% 0%, 0% 100%, 100% 100%)",
          boxShadow: "0 0 5px #ff0000",
        }}
      ></div>

      {/* Center point where triangles meet */}
      <div
        className="triangle-center absolute w-6 h-6 bg-red-500 rounded-full"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 10px #ff0000",
        }}
      ></div>
    </div>
  )
}
