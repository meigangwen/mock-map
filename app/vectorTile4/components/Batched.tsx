import * as React from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { featureScale, extent } from "../constants/Scale";
import { VectorTileLayer, VectorTileFeature } from "@mapbox/vector-tile";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function Batched({ ...props }) {
  // create a UI control
  const { visible } = useControls("Batched", {
    visible: true,
  });

  // load a single three geometry from glb file
  const gltf = useLoader(GLTFLoader, "/model/hdb/14_12914_8132.glb");

  let geometry = new THREE.BufferGeometry();
  let material;

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

  return (
    <mesh
      material={material}
      geometry={geometry}
      renderOrder={10}
      castShadow
      {...props}
    ></mesh>
  );
}

export default Batched;
