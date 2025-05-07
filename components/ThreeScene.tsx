"use client";
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

function Model() {
  const { scene } = useGLTF('/baby.glb') 
  return <primitive object={scene} scale={5} />
}

export default function ThreeScene() {
  return (
    <Canvas style={{ background: 'radial-gradient(circle, #c0392b 20%, #7b241c 100%)' }} camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.8} />
      <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1.5} />
      <Suspense fallback={null}>
        <Model />
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1} />
      </Suspense>
    </Canvas>
  )
}
