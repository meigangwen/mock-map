import * as React from "react";
import * as THREE from "three";
import { useControls } from "leva";
//import { ringToShape, ringToHole, signedArea } from "../functions/Polygon";
import { VectorTileLayer, VectorTileFeature } from "@mapbox/vector-tile";
import { scale } from "../constants/Scale";

//export default function Road({ roadData }) {
const Road: React.FC<{ roadLayer: VectorTileLayer }> = ({ roadLayer }) => {
  const { visible } = useControls("Road", {
    visible: true,
  });

  let roadList = [
    {
      class: "service",
      width: 4.0,
      color: "#ffffff",
      renderOrder: 7,
      shapes: [],
    },
    {
      class: "path",
      width: 2.0,
      color: "#ffffff",
      renderOrder: 7,
      shapes: [],
    },
    {
      class: "minor",
      width: 6.0,
      color: "#ffffff",
      renderOrder: 7,
      shapes: [],
    },
    {
      class: "trunk",
      width: 12.0,
      color: "#ffff00",
      renderOrder: 7,
      shapes: [],
    },
    {
      class: "primary",
      width: 12.0,
      color: "#ffff00",
      renderOrder: 7,
      shapes: [],
    },
    {
      class: "secondary",
      width: 10.0,
      color: "#ffff00",
      renderOrder: 7,
      shapes: [],
    },
    {
      class: "motorway",
      width: 15.0,
      color: "#fda172",
      renderOrder: 6,
      shapes: [],
    },
  ];

  const resolution = 1;

  for (let i = 0; i < roadLayer.length; i++) {
    // loop through all the roads
    if (roadLayer.feature(i).type === 2) {
      const geometry = roadLayer.feature(i).loadGeometry()[0];
      const length = geometry.length;
      const curvePoints = geometry.map((coordinate) => {
        return new THREE.Vector3(
          -coordinate.x * scale,
          coordinate.y * scale,
          0
        );
      });
      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const points = curve.getPoints(length * resolution);
      const roadClass = roadLayer.feature(i).properties.class;
      //console.log(roadClass);
      const roadObj = roadList.find((obj) => obj.class === roadClass);

      //roadObj may not be found
      if (roadObj) {
        const width = roadObj.width;
        const shape = new THREE.Shape();

        for (let j = 0; j < points.length - 1; j++) {
          let start = points[j];
          let end = points[j + 1];

          let direction = new THREE.Vector3()
            .subVectors(end, start)
            .normalize();
          let perpendicular = new THREE.Vector3(
            -direction.y,
            direction.x,
            0
          ).multiplyScalar(width * 0.5);

          if (j === 0) {
            shape.moveTo(start.x + perpendicular.x, start.y + perpendicular.y);
          }

          shape.lineTo(end.x + perpendicular.x, end.y + perpendicular.y);
        }

        for (let j = points.length - 2; j >= 0; j--) {
          let start = points[j + 1];
          let end = points[j];

          let direction = new THREE.Vector3()
            .subVectors(end, start)
            .normalize();
          let perpendicular = new THREE.Vector3(
            -direction.y,
            direction.x,
            0
          ).multiplyScalar(width * 0.5);

          shape.lineTo(start.x + perpendicular.x, start.y + perpendicular.y);

          if (j === 0) {
            shape.lineTo(end.x + perpendicular.x, end.y + perpendicular.y);
          }
        }

        roadObj.shapes.push(shape);
      }
    } else {
      if (roadLayer.feature(i).type === 2) {
        // if the road is a polygon
        // not setting the geometry for now
      }
    }
  }

  return (
    <group visible={visible}>
      {roadList.map((roadObj) => {
        return (
          <mesh
            renderOrder={roadObj.renderOrder}
            receiveShadow
            key={roadObj.class}
          >
            <meshStandardMaterial
              color={roadObj.color}
              side={THREE.FrontSide}
              depthTest={false}
            />
            <shapeGeometry args={[roadObj.shapes]} />
          </mesh>
        );
      })}
    </group>
  );
};

export default Road;
