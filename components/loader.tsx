"use client"

import { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { gsap } from "gsap"
import type * as THREE from "three"

function TransformerFace() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#00a2ff" emissive="#0066cc" metalness={0.9} roughness={0.1} />
    </mesh>
  )
}

export default function Loader() {
  const leftDoorRef = useRef<HTMLDivElement>(null)
  const rightDoorRef = useRef<HTMLDivElement>(null)
  const topDoorRef = useRef<HTMLDivElement>(null)
  const faceContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Initial state
    gsap.set(leftDoorRef.current, { x: "-100%" })
    gsap.set(rightDoorRef.current, { x: "100%" })
    gsap.set(topDoorRef.current, { y: "-100%" })
    gsap.set(faceContainerRef.current, { opacity: 0, scale: 0.5 })

    // Animation sequence
    tl.to(leftDoorRef.current, { x: "0%", duration: 1.2, ease: "power3.inOut" })
      .to(rightDoorRef.current, { x: "0%", duration: 1.2, ease: "power3.inOut" }, "<")
      .to(topDoorRef.current, { y: "0%", duration: 1.2, ease: "power3.inOut" }, "<0.3")
      .to(
        faceContainerRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.5",
      )
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="relative w-full h-full">
        {/* Left Door */}
        <div
          ref={leftDoorRef}
          className="absolute top-0 left-0 w-1/2 h-full bg-gray-900 border-r border-blue-500 z-10"
          style={{ boxShadow: "inset 0 0 20px #0066cc" }}
        />

        {/* Right Door */}
        <div
          ref={rightDoorRef}
          className="absolute top-0 right-0 w-1/2 h-full bg-gray-900 border-l border-blue-500 z-10"
          style={{ boxShadow: "inset 0 0 20px #0066cc" }}
        />

        {/* Top Door */}
        <div
          ref={topDoorRef}
          className="absolute top-0 left-0 w-full h-1/3 bg-gray-900 border-b border-blue-500 z-20"
          style={{ boxShadow: "inset 0 0 20px #0066cc" }}
        />

        {/* Transformer Face */}
        <div ref={faceContainerRef} className="absolute inset-0 flex items-center justify-center z-30">
          <div className="w-64 h-64">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <TransformerFace />
              <Environment preset="night" />
            </Canvas>
          </div>
          <div className="absolute bottom-10 text-center">
            <h1 className="text-4xl font-bold tracking-widest text-blue-400 animate-pulse">TRANSFORMERS</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
