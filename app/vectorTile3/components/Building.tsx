import * as React from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { ringToShape, ringToHole, signedArea } from "../functions/Polygon";
import { VectorTileLayer, VectorTileFeature } from "@mapbox/vector-tile";

const Building: React.FC<{ buildingLayer: VectorTileLayer }> = ({
  buildingLayer,
}) => {
  const { visible } = useControls("Building", {
    visible: true,
  });

  // define a building struct
  interface Building {
    min_height: number; //the starting height of the building
    height: number; //the actual height of the building, counting from the starting height
    color: string;
    shapes: [];
  }
  let buildingList = [];

  for (let i = 0; i < buildingLayer.length; i++) {
    //looping through all the buildings
    let shapes = [];
    let shape;
    const geometry = buildingLayer.feature(i).loadGeometry();
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

    const building: Building = {
      min_height: min_height,
      height: height,
      color: "#ffffff",
      shapes: shapes,
    };
    buildingList.push(building);
  }

  return (
    <group visible={visible} renderOrder={10}>
      {buildingList.map((buildingObj, index) => {
        return (
          <mesh
            position={[0, 0, buildingObj.min_height]}
            receiveShadow
            castShadow
            key={index}
          >
            <meshStandardMaterial
              color={"#ffffff"}
              side={THREE.FrontSide}
              envMapIntensity={0.75}
            />
            <extrudeGeometry
              args={[
                buildingObj.shapes,
                {
                  steps: 1,
                  depth: buildingObj.height,
                  bevelEnabled: false,
                  bevelThickness: 1,
                  bevelSize: 1,
                  bevelOffset: 0,
                  bevelSegments: 1,
                },
              ]}
            />
          </mesh>
        );
      })}
    </group>
  );
};
export default Building;
