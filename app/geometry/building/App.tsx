"use client";

import { Canvas, extend } from "@react-three/fiber";
import { Stats, MapControls, Environment } from "@react-three/drei";
import Building from "./Building";
import FloorCustom from "./FloorCustom";
import Sphere from "./Sphere";
//import SphereLambert from "./SphereLambert";
import SphereCustomLambert from "./SphereCustomLambert";
//import SphereStandard from "./SphereStandard";
import Lights from "./Lights";
//import * as THREE from "three";
import "./MeshEdgeMaterial";
import SphereStandard from "./SphereStandard";

export default function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 100], zoom: 2, up: [0, 0, 1], far: 1000 }}
    >
      <Environment
        files="/img/kloofendal_43d_clear_puresky_1k.hdr"
        background
      />
      <color args={["black"]} attach="background" />
      <fog attach="fog" args={["white", 50, 500]} />
      <Building />
      <FloorCustom />
      <Sphere />
      <SphereStandard />
      <SphereCustomLambert />
      <Lights />

      <MapControls enableRotate={true} />
      <Stats />
    </Canvas>
  );
}
