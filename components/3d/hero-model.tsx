"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import type * as THREE from "three"

function TransformerModel() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Since we don't have an actual Transformer model, we'll create a stylized robot-like shape
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        {/* Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2, 3, 1]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 2, 0]} castShadow>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Eyes */}
        <mesh position={[0.3, 2.2, 0.65]} castShadow>
          <boxGeometry args={[0.2, 0.1, 0.1]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-0.3, 2.2, 0.65]} castShadow>
          <boxGeometry args={[0.2, 0.1, 0.1]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
        </mesh>

        {/* Arms */}
        <mesh position={[1.5, 0.5, 0]} castShadow>
          <boxGeometry args={[1, 0.5, 0.5]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-1.5, 0.5, 0]} castShadow>
          <boxGeometry args={[1, 0.5, 0.5]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Legs */}
        <mesh position={[0.6, -2, 0]} castShadow>
          <boxGeometry args={[0.8, 1, 0.8]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.6, -2, 0]} castShadow>
          <boxGeometry args={[0.8, 1, 0.8]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Autobot symbol */}
        <mesh ref={meshRef} position={[0, 0.5, 0.55]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.1, 6]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  )
}

export default function HeroModel() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} intensity={1} castShadow />
      <TransformerModel />
      <Environment preset="night" />
    </Canvas>
  )
}
