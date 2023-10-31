"use client";

import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls, Environment } from "@react-three/drei";
import Box from "./Box";
import Tree from "./Tree";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 20], up: [0, 1, 0], far: 1000 }}>
      <Tree />
      <directionalLight intensity={1.0} position={[100, 100, 100]} />
      <OrbitControls />
      <Environment preset="forest" />
      <Stats />
    </Canvas>
  );
}
