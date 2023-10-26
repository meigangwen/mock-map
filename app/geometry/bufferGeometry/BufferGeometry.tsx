import { useState, useEffect } from "react";
import * as THREE from "three";

export default function BufferGeometry() {
  //setup the bufferGeometry
  let geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
    1.0, -1.0, -1.0, 1.0,
    // ... Add more vertices as needed
  ]);
  let colors = new Float32Array([
    1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    1.0, 0.0, 0.0,
    // ... Add more colors as needed
  ]);
  let uvs = new Float32Array([
    0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0,
    // ... Add more uvs as needed
  ]);
  let normals = new Float32Array([
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    // ... Add more normals as needed
  ]);
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  /*
  useEffect(() => {
  }, []);
  */

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial vertexColors side={THREE.DoubleSide} />
    </mesh>
  );
}
