import { useState, useEffect } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/*
function InstancedThing() {
  const ref = useRef()
  useEffect(() => {
    ref.current.setMatrixAt(0, new THREE.Matrix4())
  }, [])
  return (
    <instancedMesh ref={ref} args={[null, null, 1]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </instancedMesh>
  )
}
*/

/*
function InstancedThing() {
  const ref = useUpdate(imesh => {
    imesh.setMatrixAt(0, new THREE.Matrix4())
  }, [])
  return (
    <instancedMesh ref={ref} args={[null, null, 1]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </instancedMesh>
  )
}
*/

export default function Houdini() {
  const gltf = useLoader(GLTFLoader, "/model/houdini/tree_01.glb");
  let geometry = new THREE.BufferGeometry();
  let instancedMesh;
  let material;

  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      //if there is not vertex normals, compute it
      if (!child.geometry.attributes.normal) {
        child.geometry.computeVertexNormals();
      }

      geometry = child.geometry;
      material = child.material;

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
    }
  });

  return (
    <instancedMesh geometry={instancedMesh} material={material}></instancedMesh>
  );
}
