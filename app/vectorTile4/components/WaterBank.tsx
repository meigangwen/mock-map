import { useControls } from "leva";
import * as THREE from "three";
import {
  VectorTile,
  VectorTileLayer,
  VectorTileFeature,
} from "@mapbox/vector-tile";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function WaterBank({ ...props }) {
  //declare the UI parameters
  const { visible } = useControls("WaterBank", {
    visible: true,
  });

  // load the ground mesh
  // load a single three geometry from glb file
  const gltf = useLoader(GLTFLoader, "/model/ground/14_12914_8132_side.glb");

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
    <mesh visible={visible} geometry={geometry} renderOrder={2} {...props}>
      <meshStandardMaterial
        color={"#767676"}
        side={THREE.BackSide}
        envMapIntensity={0.5}
        depthTest={false}
      />
    </mesh>
  );
}

export default WaterBank;
