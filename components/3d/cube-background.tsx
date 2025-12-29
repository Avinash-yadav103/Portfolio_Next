"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useInView } from "framer-motion"
import { useTheme } from "next-themes"
import * as THREE from "three"

// Theme color mapping for cubes
const themeColors: Record<string, { main: string; emissive: string }> = {
  light: { main: "#dc2626", emissive: "#dc2626" },
  dark: { main: "#ef4444", emissive: "#ef4444" },
  optimus: { main: "#dc2626", emissive: "#1e40af" },
  bumblebee: { main: "#facc15", emissive: "#facc15" },
  space: { main: "#a78bfa", emissive: "#8b5cf6" },
  system: { main: "#ef4444", emissive: "#ef4444" },
}

function Cubes({ count = 40, theme = "dark" }: { count?: number; theme?: string }) {
  const meshes = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const colors = themeColors[theme] || themeColors.dark

  useEffect(() => {
    // Position the cubes randomly
    if (meshes.current) {
      for (let i = 0; i < count; i++) {
        dummy.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30)
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
        const scale = Math.random() * 0.5 + 0.1
        dummy.scale.set(scale, scale, scale)
        dummy.updateMatrix()
        meshes.current.setMatrixAt(i, dummy.matrix)
      }
      meshes.current.instanceMatrix.needsUpdate = true
    }
  }, [count, dummy])

  useFrame((state) => {
    if (meshes.current) {
      meshes.current.rotation.y = state.clock.getElapsedTime() * 0.05
      meshes.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 0.2
    }
  })

  return (
    <instancedMesh ref={meshes} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={colors.main}
        emissive={colors.emissive}
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </instancedMesh>
  )
}

// Stars for space theme
function Stars({ count = 200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#a78bfa"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}

export default function CubeBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return <div ref={ref} className="w-full h-full" />
  }

  const currentTheme = theme || "dark"
  const isSpaceTheme = currentTheme === "space"

  return (
    <div ref={ref} className="w-full h-full">
      {isInView && (
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={isSpaceTheme ? 0.1 : 0.2} />
          <pointLight position={[10, 10, 10]} intensity={isSpaceTheme ? 0.5 : 0.8} />
          {isSpaceTheme && (
            <>
              <Stars count={300} />
              <pointLight position={[-10, -10, 10]} intensity={0.3} color="#8b5cf6" />
            </>
          )}
          <Cubes theme={currentTheme} count={isSpaceTheme ? 20 : 40} />
        </Canvas>
      )}
    </div>
  )
}
