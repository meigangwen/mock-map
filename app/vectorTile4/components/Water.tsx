import { useControls } from "leva";
import * as THREE from "three";
import {
  VectorTile,
  VectorTileLayer,
  VectorTileFeature,
} from "@mapbox/vector-tile";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function Water({ ...props }) {
  //declare the UI parameters
  const { visible } = useControls("Water", {
    visible: true,
  });

  // load the ground mesh
  // load a single three geometry from glb file
  const gltf = useLoader(GLTFLoader, "/model/water/14_12914_8132.glb");

  let geometry = new THREE.BufferGeometry();
  //let material;

  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      //if there is not vertex normals, compute it
      if (!child.geometry.attributes.normal) {
        child.geometry.computeVertexNormals();
      }

      geometry = child.geometry;
      //material = child.material;
    }
  });

  return (
    <mesh
      visible={visible}
      geometry={geometry}
      receiveShadow
      renderOrder={1}
      {...props}
    >
      <meshStandardMaterial
        color={"#1eb4ff"}
        side={THREE.FrontSide}
        roughness={0.1}
        envMapIntensity={0.2}
        depthTest={false}
      />
    </mesh>
  );
}

export default Water;
