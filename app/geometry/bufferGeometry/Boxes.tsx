import { useState, useEffect } from "react";
import * as THREE from "three";
import data from "../../../model/box.json";

export default function Boxes() {
  //console.log(data[15][1][0][1][7][5]);
  //setup the bufferGeometry
  const indices = data[13][1][1];
  const verticesArray = data[15][3][0][1][7][5];
  const normalArray = data[15][1][0][1][7][5];

  let verticesData = [];
  for (let i = 0; i < verticesArray.length; i++) {
    verticesData.push(verticesArray[i][0]);
    verticesData.push(verticesArray[i][1]);
    verticesData.push(verticesArray[i][2]);
  }

  const vertices = new Float32Array(verticesData);

  let normalData = [];
  for (let i = 0; i < normalArray.length; i++) {
    normalData.push(normalArray[i][0]);
    normalData.push(normalArray[i][1]);
    normalData.push(normalArray[i][2]);
  }

  const normals = new Float32Array(normalData);

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));

  return (
    <>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="red" side={THREE.FrontSide} />
      </mesh>
    </>
  );
}
