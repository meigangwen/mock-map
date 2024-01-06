import { useState, useEffect } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
//import { perf}

export default function Houdini() {
  const gltf = useLoader(GLTFLoader, "/model/houdini/tree_01.glb");
  let geometry = new THREE.BufferGeometry();
  let instancedMesh;
  let material;

  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      //retrieve geometry/map/skeleton or whatsoever here...
      //if there is not vertex normals, compute it
      if (!child.geometry.attributes.normal) {
        child.geometry.computeVertexNormals();
      }

      geometry = child.geometry;
      material = child.material;
      console.log(material);

      const instanceCount = 10;
      instancedMesh = new THREE.InstancedMesh(
        geometry,
        material,
        instanceCount
      );

      const matrix = new THREE.Matrix4();
      for (let i = 0; i < instanceCount; i++) {
        matrix.setPosition(
          Math.random() * 50,
          Math.random() * 50,
          Math.random() * 50
        );
        instancedMesh.setMatrixAt(i, matrix);
      }
      //console.log(child);
    }
  });

  return (
    <instancedMesh geometry={instancedMesh} material={material}></instancedMesh>
  );
}
