import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import modelPath from './assets/3d-sereya-gib/base_basic_pbr.glb?url'

function HeroModel({ onLoaded }) {
  const group = useRef()
  const { scene } = useGLTF(modelPath)

  useEffect(() => {
    if (onLoaded) onLoaded()
  }, [onLoaded])

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += Math.min(delta, 0.03) * 0.35
    }
  })

  return (
    <group ref={group} rotation={[0, 0, 0]} dispose={null}>
      <primitive object={scene} scale={1.02} position={[0, -0.04, 0]} />
    </group>
  )
}

useGLTF.preload(modelPath)

export default function HeroScene({ dpr = [1, 1.5] }) {
  const [modelReady, setModelReady] = useState(false)

  return (
    <Canvas
      className={`hero-canvas ${modelReady ? 'is-ready' : ''}`}
      camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 1000 }}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
      dpr={dpr}
      performance={{ min: 0.5, max: 1.5 }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight intensity={0.9} position={[3, 3, 3]} />
      <directionalLight intensity={0.35} position={[-4, 2, -2]} />
      <Suspense fallback={null}>
        <HeroModel onLoaded={() => setModelReady(true)} />
      </Suspense>
    </Canvas>
  )
}
