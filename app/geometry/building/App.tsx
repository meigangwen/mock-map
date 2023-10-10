"use client";

import { Canvas } from "@react-three/fiber";
import { Stats, MapControls, Environment } from "@react-three/drei";
import Building from "./Building";
import Floor from "./Floor";
import FloorCustom from "./FloorCustom";
import Sphere from "./Sphere";
import SphereLambert from "./SphereLambert";
import SphereCustomLambert from "./SphereCustomLambert";
import SphereStandard from "./SphereStandard";

export default function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 100], zoom: 2, up: [0, 0, 1], far: 1000 }}
    >
      <fog attach="fog" args={["white", 50, 500]} />
      <Building />
      <FloorCustom />
      <Sphere />
      <SphereLambert />
      <SphereCustomLambert />
      <SphereStandard />

      <directionalLight
        visible
        position={[10, 5, 30]}
        intensity={3.0}
        castShadow={true}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <ambientLight visible intensity={0.5} />

      <hemisphereLight
        //color={'#ff0000'}
        //groundColor={'#0000ff'}
        intensity={1.0}
      />
      <Environment preset="city" background />

      <MapControls enableRotate={true} />
      <Stats />
    </Canvas>
  );
}
