"use client";

//import { useState, useEffect } from 'react'
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls, Environment } from "@react-three/drei";
import Ground from "./Ground";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 75], up: [0, 1, 0], far: 1000 }}>
      <directionalLight intensity={1.0} position={[100, 100, 100]} />
      <OrbitControls />
      <Ground />
      <Environment preset="forest" />
      <Stats />
    </Canvas>
  );
}
