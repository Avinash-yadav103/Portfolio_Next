"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import type * as THREE from "three"

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <group>
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.2} wireframe />
      </mesh>

      {/* Front face */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5} position={[0, 0, 1.55]}>
        <Text
          color="#ef4444"
          fontSize={0.4}
          maxWidth={2}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="/fonts/Geist-Bold.ttf"
        >
          REACT
        </Text>
      </Float>

      {/* Back face */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5} position={[0, 0, -1.55]}>
        <Text
          color="#ef4444"
          fontSize={0.4}
          maxWidth={2}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="/fonts/Geist-Bold.ttf"
          rotation={[0, Math.PI, 0]}
        >
          NODE.JS
        </Text>
      </Float>

      {/* Right face */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5} position={[1.55, 0, 0]}>
        <Text
          color="#ef4444"
          fontSize={0.4}
          maxWidth={2}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="/fonts/Geist-Bold.ttf"
          rotation={[0, Math.PI / 2, 0]}
        >
          THREE.JS
        </Text>
      </Float>

      {/* Left face */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5} position={[-1.55, 0, 0]}>
        <Text
          color="#ef4444"
          fontSize={0.4}
          maxWidth={2}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="/fonts/Geist-Bold.ttf"
          rotation={[0, -Math.PI / 2, 0]}
        >
          NEXT.JS
        </Text>
      </Float>

      {/* Top face */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5} position={[0, 1.55, 0]}>
        <Text
          color="#ef4444"
          fontSize={0.4}
          maxWidth={2}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="/fonts/Geist-Bold.ttf"
          rotation={[-Math.PI / 2, 0, 0]}
        >
          TAILWIND
        </Text>
      </Float>

      {/* Bottom face */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5} position={[0, -1.55, 0]}>
        <Text
          color="#ef4444"
          fontSize={0.4}
          maxWidth={2}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="/fonts/Geist-Bold.ttf"
          rotation={[Math.PI / 2, 0, 0]}
        >
          TYPESCRIPT
        </Text>
      </Float>
    </group>
  )
}

export default function SkillCube() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <RotatingCube />
    </Canvas>
  )
}
