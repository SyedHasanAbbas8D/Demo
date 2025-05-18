"use client";

import { useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';

export default function Model() {
  const [isMounted, setIsMounted] = useState(false);
  const { scene } = useGLTF('/models/addidas_v6.glb');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <primitive object={scene} scale={0.5} position={[0, -1, 0]} />;
} 