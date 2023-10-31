import { useState, useEffect } from "react";
import * as THREE from "three";

export default function Box() {
  //setup the bufferGeometry
  let geometry = new THREE.BufferGeometry();

  const width = 10.0;
  const height = 10.0;
  const depth = 10.0;
  const widthHalf = width / 2;
  const heightHalf = height / 2;
  const depthHalf = depth / 2;

  const indices = [
    0,
    1,
    2,
    0,
    2,
    3, // Front face
    4,
    5,
    6,
    4,
    6,
    7, // Back face
    8,
    9,
    10,
    8,
    10,
    11, // Top face
    12,
    13,
    14,
    12,
    14,
    15, // Bottom face
    16,
    17,
    18,
    16,
    18,
    19, // Right face
    20,
    21,
    22,
    20,
    22,
    23, // Left face
  ];

  const vertices = new Float32Array([
    // Front face
    -widthHalf,
    -heightHalf,
    depthHalf,
    widthHalf,
    -heightHalf,
    depthHalf,
    widthHalf,
    heightHalf,
    depthHalf,
    -widthHalf,
    heightHalf,
    depthHalf,
    // Back face
    -widthHalf,
    -heightHalf,
    -depthHalf,
    -widthHalf,
    heightHalf,
    -depthHalf,
    widthHalf,
    heightHalf,
    -depthHalf,
    widthHalf,
    -heightHalf,
    -depthHalf,
    // Top face
    -widthHalf,
    heightHalf,
    -depthHalf,
    -widthHalf,
    heightHalf,
    depthHalf,
    widthHalf,
    heightHalf,
    depthHalf,
    widthHalf,
    heightHalf,
    -depthHalf,
    // Bottom face
    -widthHalf,
    -heightHalf,
    -depthHalf,
    widthHalf,
    -heightHalf,
    -depthHalf,
    widthHalf,
    -heightHalf,
    depthHalf,
    -widthHalf,
    -heightHalf,
    depthHalf,
    // Right face
    widthHalf,
    -heightHalf,
    -depthHalf,
    widthHalf,
    heightHalf,
    -depthHalf,
    widthHalf,
    heightHalf,
    depthHalf,
    widthHalf,
    -heightHalf,
    depthHalf,
    // Left face
    -widthHalf,
    -heightHalf,
    -depthHalf,
    -widthHalf,
    -heightHalf,
    depthHalf,
    -widthHalf,
    heightHalf,
    depthHalf,
    -widthHalf,
    heightHalf,
    -depthHalf,
  ]);

  let normals = new Float32Array([
    // Front face
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    // Back face
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    // Top face
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    // Bottom face
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
    // Right face
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    // Left face
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    // ... Add more normals as needed
  ]);

  geometry.setIndex(indices);
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  //geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  //geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="red" side={THREE.FrontSide} />
    </mesh>
  );
}
