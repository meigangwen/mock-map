"use client";

import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls, Environment } from "@react-three/drei";
import Tree from "./Tree";
import Houdini from "./Houdini";
import { Perf } from "r3f-perf";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 10], up: [0, 1, 0], far: 1000 }}>
      <Tree />
      <directionalLight intensity={1.0} position={[100, 100, 100]} />
      <OrbitControls />
      <Environment preset="forest" />
      <Stats />
      <Perf />
    </Canvas>
  );
}
