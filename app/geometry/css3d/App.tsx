"use client";

//import { useState, useEffect } from 'react'
import { Canvas } from "@react-three/fiber";
import { Stats, MapControls, Text, Billboard } from "@react-three/drei";
import Floor from "./Floor";
import Lights from "./Lights";
import Sphere from "./Sphere";

export default function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 100], zoom: 2, up: [0, 0, 1], far: 10000 }}
      shadows
    >
      <color args={["black"]} attach="background" />
      <MapControls enableRotate={true} />
      <Floor />
      <Sphere />
      <Billboard
        position={[1.0, 1.0, 5.0]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false} // Lock the rotation on the z axis (default=false)
      >
        <Text fontSize={3}>I'm a billboard</Text>
      </Billboard>
      <Text position={[1.0, 1.0, 10.0]} fontSize={3}>
        I'm a Text
      </Text>
      <Lights />
      <Stats />
    </Canvas>
  );
}
