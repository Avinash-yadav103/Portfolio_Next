"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment, Float, OrbitControls, Center } from "@react-three/drei"
import type * as THREE from "three"

function BumblebeeModel() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/images/bumble.glb")

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <Center>
        <group ref={groupRef} scale={0.8} position={[0, 0, 0]} rotation={[0, -0.5, 0]}>
          <primitive object={scene} />
        </group>
      </Center>
    </Float>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#FFD700" wireframe />
    </mesh>
  )
}

export default function HeroModel() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [5, 2, 8], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FFD700" />
        <spotLight 
          position={[0, 10, 0]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <Suspense fallback={<LoadingFallback />}>
          <BumblebeeModel />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          target={[0, 0, 0]}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

// Preload the model
useGLTF.preload("/images/bumble.glb")
