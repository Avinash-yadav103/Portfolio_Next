"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { gsap } from "gsap"
import * as THREE from "three"

function TransformingCubes() {
  const groupRef = useRef<THREE.Group>(null)
  const [assembled, setAssembled] = useState(true)
  const [animating, setAnimating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Create refs for individual cubes
  const cubes = useRef<THREE.Mesh[]>([])
  const cubePositions = useRef<THREE.Vector3[]>([])
  const cubeRotations = useRef<THREE.Euler[]>([])

  // Number of cubes in the grid
  const gridSize = 3
  const spacing = 1.2

  // Initialize cube positions
  useEffect(() => {
    setIsMounted(true)

    cubePositions.current = []
    cubeRotations.current = []

    // Create initial positions (assembled state)
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const posX = (x - (gridSize - 1) / 2) * spacing
          const posY = (y - (gridSize - 1) / 2) * spacing
          const posZ = (z - (gridSize - 1) / 2) * spacing

          cubePositions.current.push(new THREE.Vector3(posX, posY, posZ))
          cubeRotations.current.push(new THREE.Euler(0, 0, 0))
        }
      }
    }
  }, [])

  // Toggle between assembled and disassembled states
  useEffect(() => {
    if (!isMounted) return

    const toggleInterval = setInterval(() => {
      if (!animating) {
        setAnimating(true)
        setAssembled((prev) => !prev)
      }
    }, 8000)

    return () => clearInterval(toggleInterval)
  }, [animating, isMounted])

  // Handle animation between states
  useEffect(() => {
    if (cubes.current.length === 0 || !animating || !isMounted) return

    const timeline = gsap.timeline({
      onComplete: () => {
        setAnimating(false)
      },
    })

    cubes.current.forEach((cube, i) => {
      if (!cube) return

      if (assembled) {
        // Animate to disassembled state
        const randomX = (Math.random() - 0.5) * 10
        const randomY = (Math.random() - 0.5) * 10
        const randomZ = (Math.random() - 0.5) * 10

        timeline.to(
          cube.position,
          {
            x: randomX,
            y: randomY,
            z: randomZ,
            duration: 1.5,
            ease: "power2.out",
          },
          0,
        )

        timeline.to(
          cube.rotation,
          {
            x: Math.random() * Math.PI * 2,
            y: Math.random() * Math.PI * 2,
            z: Math.random() * Math.PI * 2,
            duration: 1.5,
            ease: "power2.out",
          },
          0,
        )
      } else {
        // Animate to assembled state
        timeline.to(
          cube.position,
          {
            x: cubePositions.current[i].x,
            y: cubePositions.current[i].y,
            z: cubePositions.current[i].z,
            duration: 1.5,
            ease: "power2.inOut",
          },
          0,
        )

        timeline.to(
          cube.rotation,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: "power2.inOut",
          },
          0,
        )
      }
    })

    return () => {
      timeline.kill()
    }
  }, [assembled, animating, isMounted])

  // Slow rotation of the entire group
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  // Create the grid of cubes
  const cubeSize = 0.8
  const totalCubes = gridSize * gridSize * gridSize

  return (
    <group ref={groupRef}>
      {Array.from({ length: totalCubes }).map((_, i) => {
        const x = i % gridSize
        const y = Math.floor(i / gridSize) % gridSize
        const z = Math.floor(i / (gridSize * gridSize))

        const posX = (x - (gridSize - 1) / 2) * spacing
        const posY = (y - (gridSize - 1) / 2) * spacing
        const posZ = (z - (gridSize - 1) / 2) * spacing

        // Different colors for different layers
        const colors = ["#ef4444", "#f97316", "#facc15"]
        const color = colors[z % colors.length]

        return (
          <mesh
            key={i}
            position={[posX, posY, posZ]}
            ref={(el) => {
              if (el) cubes.current[i] = el
            }}
          >
            <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
            <meshStandardMaterial
              color={color}
              metalness={0.8}
              roughness={0.2}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </mesh>
        )
      })}

      {/* Text label */}
      <Text position={[0, -4, 0]} color="#ffffff" fontSize={0.5} font="/fonts/Geist-Bold.ttf" anchorY="bottom">
        {assembled ? "TRANSFORMING..." : "REASSEMBLING..."}
      </Text>
    </group>
  )
}

export default function TransformingCube() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="w-full h-full bg-black"></div>
  }

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
        <TransformingCubes />
      </Canvas>
    </div>
  )
}
