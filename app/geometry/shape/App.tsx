"use client";

//import { useState, useEffect } from 'react'
import { Canvas } from "@react-three/fiber";
import { Stats, MapControls } from "@react-three/drei";

import Shape01 from "./Shape01";
import ShapeOutline01 from "./ShapeOutline01";

export default function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 100], zoom: 2, up: [0, 0, 1], far: 10000 }}
    >
      <MapControls enableRotate={true} />
      <ShapeOutline01 />
      <Stats />
    </Canvas>
  );
}
