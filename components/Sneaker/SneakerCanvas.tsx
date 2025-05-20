"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ThreeModel } from "./ThreeModel";

export default function SneakerCanvas({ model, title }: { model: string; title: string }) {
  return (
    <Canvas key={title} camera={{ position: [0, 2, 4], fov: 25 }}>
      <ambientLight intensity={1} />
      <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={0.5} castShadow />
      <spotLight position={[-5, 5, -5]} angle={0.3} penumbra={1} intensity={0.3} castShadow />
      <ThreeModel model={model} />
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1}
      />
    </Canvas>
  );
}