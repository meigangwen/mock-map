import * as React from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { featureScale, extent } from "../constants/Scale";
import { VectorTileLayer, VectorTileFeature } from "@mapbox/vector-tile";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const Flora: React.FC<{ floraLayer: VectorTileLayer }> = ({ floraLayer }) => {
  // create a UI control
  const { visible } = useControls("Flora", {
    visible: true,
  });

  // load a single three geometry from glb file
  const ref = React.useRef();
  const gltf = useLoader(GLTFLoader, "/model/houdini/tree_01.glb");
  const instanceCount = floraLayer.length;

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

  React.useLayoutEffect(() => {
    const matrix = new THREE.Matrix4();

    //iterate through all the points
    for (let i = 0; i < floraLayer.length; i++) {
      const point = floraLayer.feature(i).loadGeometry()[0][0];
      matrix.setPosition(featureScale * point.x, 0, featureScale * point.y);
      ref.current.setMatrixAt(i, matrix);
    }
  }, []);

  return (
    <instancedMesh
      ref={ref}
      args={[null, null, instanceCount]}
      material={material}
      geometry={geometry}
      renderOrder={10}
      castShadow
    ></instancedMesh>
  );
};

export default Flora;
