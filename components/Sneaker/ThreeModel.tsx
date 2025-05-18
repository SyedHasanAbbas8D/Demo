import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { extend } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei';

extend({
  OrbitControls: OrbitControls,
});

interface ThreeModelProps {
  model: string; // e.g., 'sneaker1', 'sneaker2', etc.
}

export const ThreeModel: React.FC<ThreeModelProps> = ({ model }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Map model names to file paths
  const modelPaths: Record<string, string> = {
    sneaker1: '/models/sneaker1.glb',
    sneaker2: '/models/sneaker2.glb',
    sneaker3: '/models/sneaker3.glb',
    // Add more as needed
  };

  const path = modelPaths[model] || modelPaths['sneaker1'];
  const { scene } = useGLTF(path);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    // <Canvas>
      // <OrbitControls />
      // <ambientLight intensity={0.5} />
      // <directionalLight position={[10, 10, 10]} intensity={1} />
      <group ref={groupRef}>
        <primitive 
          object={scene} 
          scale={4}
          position={[0, -0.5, 0]}
        />
      </group>
    // </Canvas>
  );
};

// Example usage in a parent component
