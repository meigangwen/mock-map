"use client";

//import { useState, useEffect } from 'react'
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls, Environment } from "@react-three/drei";
//import BufferGeometry from "./BufferGeometry";
//import SimpleBuilding from "./SimpleBuilding";
import Boxes from "./Boxes";
import Box from "./Box";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 20], up: [0, 1, 0], far: 1000 }}>
      <Box />
      <directionalLight intensity={1.0} position={[100, 100, 100]} />
      <OrbitControls />
      <Environment preset="forest" />
      <Stats />
    </Canvas>
  );
}
