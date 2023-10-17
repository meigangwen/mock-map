import * as React from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { Text, Billboard } from "@react-three/drei";
import { ringToShape, ringToHole, signedArea } from "../functions/Polygon";
import { VectorTileLayer, VectorTileFeature } from "@mapbox/vector-tile";
import { featureScale, extent } from "../constants/Scale";

const Roadname: React.FC<{ roadnameLayer: VectorTileLayer }> = ({
  roadnameLayer,
}) => {
  const { visible } = useControls("Roadname", {
    visible: true,
  });

  interface Roadname {
    x: number;
    y: number;
    text: string;
  }
  let roadnameList = [];

  for (let i = 0; i < roadnameLayer.length; i++) {
    const feature = roadnameLayer.feature(i);
    const location = feature.loadGeometry()[0][0];
    //const location = feature.loadGeometry()[0][0];
    //console.log(feature.properties.name);
    //console.log(feature.loadGeometry()[0]);
    const roadname: Roadname = {
      x: location.x * featureScale,
      y: -location.y * featureScale,
      text: feature.properties.name,
    };
    roadnameList.push(roadname);
  }
  //console.log(houseNumberList);

  return (
    <group visible={visible} renderOrder={10}>
      {roadnameList.map((roadname, index) => {
        return (
          <Text
            key={index}
            position={[roadname.x, 0, -roadname.y]}
            fontSize={3}
            color="black"
          >
            {roadname.text}
          </Text>
        );
      })}
    </group>
  );
};
export default Roadname;
