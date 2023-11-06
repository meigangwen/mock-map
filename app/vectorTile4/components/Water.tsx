import * as React from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { ringToShape, ringToHole, signedArea } from "../functions/Polygon";
import { VectorTileLayer, VectorTileFeature } from "@mapbox/vector-tile";

const Water: React.FC<{ waterLayer: VectorTileLayer }> = ({ waterLayer }) => {
  //declare the UI parameters
  const { visible, depth, color } = useControls("Water", {
    visible: true,
    depth: { value: 5, min: 0, max: 20, step: 0.1 },
    color: { value: "#1eb4ff" },
  });

  const extrudeSettings = {
    steps: 1,
    depth: -depth,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1,
  };

  //loading the water layer data
  let flatShapes = [],
    extrudeShapes = [],
    shape;

  for (let i = 0; i < waterLayer.length; i++) {
    const geometry = waterLayer.feature(i).loadGeometry();
    const isDeep = !(
      waterLayer.feature(i).properties.class === "swimming_pool" ||
      waterLayer.feature(i).properties.class === "pond"
    );

    if (geometry.length === 1) {
      // there is no need to check for holes
      const ring = geometry[0];
      shape = ringToShape(ring);
      isDeep ? extrudeShapes.push(shape) : flatShapes.push(shape);
    } else {
      // need to run test to check for holes
      for (let i = 0; i < geometry.length; i++) {
        const ring = geometry[i];
        const area = signedArea(ring);
        if (area > 0) {
          // this area is a shape
          shape = ringToShape(ring);
          isDeep ? extrudeShapes.push(shape) : flatShapes.push(shape);
        }
        if (area < 0) {
          // this area is a hole, which needs to be attached to the previous shape
          const hole = ringToHole(ring);
          shape?.holes.push(hole);
          if (!isDeep) {
            flatShapes.pop();
            flatShapes.push(shape);
          } else {
            extrudeShapes.pop();
            extrudeShapes.push(shape);
          }
        }
      }
    }
  }

  return (
    <group>
      <mesh visible={visible} renderOrder={4} receiveShadow>
        <meshStandardMaterial
          color={color}
          side={THREE.FrontSide}
          roughness={0.1}
          envMapIntensity={0.2}
          depthTest={false}
        />
        <extrudeGeometry args={[extrudeShapes, extrudeSettings]} />
      </mesh>
      <mesh visible={visible} renderOrder={4} receiveShadow>
        <meshStandardMaterial
          color={color}
          side={THREE.FrontSide}
          roughness={0.1}
          envMapIntensity={0.2}
          depthTest={false}
        />
        <shapeGeometry args={[flatShapes]} />
      </mesh>
    </group>
  );
};

export default Water;
