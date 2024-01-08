import { useState, useEffect } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
//import { perf}

export default function Houdini() {
  const gltf = useLoader(GLTFLoader, "/model/ground/14_12918_8133.glb");

  //<primitive object={gltf.scene} position={[0, 0, 0]} />
  return <primitive object={gltf.scene} position={[0, 0, 0]} />;
}
