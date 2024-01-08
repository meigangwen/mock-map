import { useState, useEffect, useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function Houdini() {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/model/houdini/tree_01.glb");

  let geometry = new THREE.BufferGeometry();
  let material;
  const instanceCount = 1000;

  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      //if there is not vertex normals, compute it
      if (!child.geometry.attributes.normal) {
        child.geometry.computeVertexNormals();
      }

      geometry = child.geometry;
      material = child.material;
    }
  });

  useLayoutEffect(() => {
    const matrix = new THREE.Matrix4();
    for (let i = 0; i < instanceCount; i++) {
      matrix.setPosition(
        Math.random() * 500,
        Math.random() * 500,
        Math.random() * 500
      );
      ref.current.setMatrixAt(i, matrix);
    }
  }, []);

  return (
    <instancedMesh
      ref={ref}
      args={[null, null, instanceCount]}
      material={material}
      geometry={geometry}
    ></instancedMesh>
  );
}
