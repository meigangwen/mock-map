import { useState, useEffect } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
//import { perf}

export default function Tree() {
  const gltf = useLoader(GLTFLoader, "/model/houdini/tree_01.glb");
  //const gltf = useLoader(GLTFLoader, "/model/tree01/scene.gltf");

  //<primitive object={gltf.scene} position={[0, 0, 0]} />
  return <primitive object={gltf.scene} position={[0, 0, 0]} />;
}
