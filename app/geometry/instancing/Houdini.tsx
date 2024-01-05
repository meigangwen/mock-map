import { useState, useEffect } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
//import { perf}

export default function Houdini() {
  const gltf = useLoader(GLTFLoader, "/model/houdini/tree_01.glb");
  let geometry = new THREE.BufferGeometry();

  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      //retrieve geometry/map/skeleton or whatsoever here...
      //if there is not vertex normals, compute it
      if (!child.geometry.attributes.normal) {
        child.geometry.computeVertexNormals();
      }
      geometry = child.geometry;
      console.log(child);
    }
  });

  //return <primitive object={gltf.scene} position={[0, 0, 0]} />;
  //return <primitive object={gltf.scene} position={[0, 0, 0]} />;
  //<meshStandardMaterial envMapIntensity={0.2} vertexColors={true} />

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial envMapIntensity={1.0} vertexColors={true} />
    </mesh>
  );
}
