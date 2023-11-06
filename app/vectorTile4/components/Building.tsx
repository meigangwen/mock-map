import * as React from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { ringToShape, ringToHole, signedArea } from "../functions/Polygon";
import { VectorTileLayer, VectorTileFeature } from "@mapbox/vector-tile";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

const Building: React.FC<{ buildingLayer: VectorTileLayer }> = ({
  buildingLayer,
}) => {
  const { visible } = useControls("Building", {
    visible: false,
  });

  // define the building material
  const buildingMat = new THREE.MeshStandardMaterial({
    color: "#ffffff",
    envMapIntensity: 0.75,
    side: THREE.FrontSide,
  });

  // define a list of building geometries
  let buildingGeometries = [];

  for (let i = 0; i < buildingLayer.length; i++) {
    //looping through all the buildings
    let shapes = [];
    let shape;
    const geometry = buildingLayer.feature(i).loadGeometry();
    //console.log(buildingLayer.feature(i));
    if (geometry.length === 1) {
      // there is no need to check for holes
      const ring = geometry[0];
      shape = ringToShape(ring);
      shapes.push(shape);
    } else {
      // need to run test to check for holes
      for (let j = 0; j < geometry.length; j++) {
        const ring = geometry[j];
        const area = signedArea(ring);
        if (area > 0) {
          // this area is a shape
          shape = ringToShape(ring);
          shapes.push(shape);
        }
        if (area < 0) {
          // this area is a hole, which needs to be attached to the previous shape
          const hole = ringToHole(ring);
          shape?.holes.push(hole);
          shapes.pop();
          shapes.push(shape);
        }
      }
    }
    const height =
      buildingLayer.feature(i).properties.render_height -
      buildingLayer.feature(i).properties.render_min_height;
    const min_height = buildingLayer.feature(i).properties.render_min_height;
    //console.log(min_height);

    const extrudeSettings = {
      steps: 1,
      depth: height,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    };

    const buildingGeometry = new THREE.ExtrudeGeometry(shapes, extrudeSettings);
    if (min_height > 0) {
      buildingGeometry.translate(0, 0, min_height);
    }
    buildingGeometries.push(buildingGeometry);
  }

  const mergedGeometry = BufferGeometryUtils.mergeGeometries(
    buildingGeometries,
    false
  );

  return (
    <mesh
      receiveShadow
      castShadow
      visible={visible}
      renderOrder={10}
      material={buildingMat}
      geometry={mergedGeometry}
    ></mesh>
  );
};

export default Building;
