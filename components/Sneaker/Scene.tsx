import React from 'react'
import { ThreeModel } from './ThreeModel'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
const Scene = () => {
  return (
    <div>
      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <ThreeModel model="sneaker1" />
      </Canvas>
    </div>
  )
}

export default Scene
