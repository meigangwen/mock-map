import * as React from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { ringToShape, ringToHole, signedArea } from "../functions/Polygon";
import { VectorTileLayer, VectorTileFeature } from "@mapbox/vector-tile";

const Landcover: React.FC<{ landcoverLayer: VectorTileLayer }> = ({
  landcoverLayer,
}) => {
  const { visible } = useControls("Landcover", {
    visible: true,
  });

  let landList = [
    {
      class: "grass",
      color: "#00ff00",
      renderOrder: 2,
      height: 0.0,
      shapes: [],
    },
    {
      class: "wood",
      color: "#009900",
      renderOrder: 3,
      height: 0.1,
      shapes: [],
    },
    {
      class: "sand",
      color: "#FFFF00",
      renderOrder: 2,
      height: 0.1,
      shapes: [],
    },
  ];

  //let shape;
  for (let i = 0; i < landcoverLayer.length; i++) {
    // looping through the features
    let shape;
    const geometry = landcoverLayer.feature(i).loadGeometry();
    const landClass = landcoverLayer.feature(i).properties.class;
    const landObj = landList.find((obj) => obj.class === landClass);

    if (geometry.length === 1) {
      // there is no need to check for holes
      const ring = geometry[0];
      shape = ringToShape(ring);
      landObj.shapes.push(shape);
    } else {
      // need to run test to check for holes
      for (let i = 0; i < geometry.length; i++) {
        const ring = geometry[i];
        const area = signedArea(ring);
        if (area > 0) {
          // this area is a shape
          shape = ringToShape(ring);
          landObj.shapes.push(shape);
        }
        if (area < 0) {
          // this area is a hole, which needs to be attached to the previous shape
          const hole = ringToHole(ring);
          shape?.holes.push(hole);
          landObj.shapes.pop();
          landObj.shapes.push(shape);
        }
      }
    }
  }

  return (
    <group visible={visible}>
      {landList.map((landObj) => {
        return (
          <mesh
            position={[0, 0, landObj.height]}
            renderOrder={landObj.renderOrder}
            receiveShadow
            key={landObj.class}
          >
            <meshStandardMaterial
              color={landObj.color}
              side={THREE.FrontSide}
              envMapIntensity={0.1}
              depthTest={false}
            />
            <shapeGeometry args={[landObj.shapes]} />
          </mesh>
        );
      })}
    </group>
  );
};

export default Landcover;
