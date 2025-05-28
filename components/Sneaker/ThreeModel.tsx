import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

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
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        scale={4}
        position={[0, -0.5, 0]}
        rotation={[0, Math.PI / 8, 0]} // Lighter rotation
      />
    </group>
  );
};