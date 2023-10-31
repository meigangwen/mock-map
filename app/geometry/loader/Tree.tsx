import { useState, useEffect } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function Tree() {
  const gltf = useLoader(GLTFLoader, "/model/tree01/scene.gltf");

  return <primitive object={gltf.scene} position={[0, 1, 0]} />;
}
