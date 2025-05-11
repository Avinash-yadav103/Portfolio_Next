"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useInView } from "framer-motion"
import * as THREE from "three"

function Cubes({ count = 40 }) {
  const meshes = useRef<THREE.InstancedMesh>(null)
  const dummy = new THREE.Object3D()

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
  }, [count])

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
        color="#ef4444"
        emissive="#ef4444"
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </instancedMesh>
  )
}

export default function CubeBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return <div ref={ref} className="w-full h-full" />
  }

  return (
    <div ref={ref} className="w-full h-full">
      {isInView && (
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <Cubes />
        </Canvas>
      )}
    </div>
  )
}
