import * as React from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { Text, Billboard } from "@react-three/drei";
import { ringToShape, ringToHole, signedArea } from "../functions/Polygon";
import { VectorTileLayer, VectorTileFeature } from "@mapbox/vector-tile";
import { featureScale, extent } from "../constants/Scale";

const Housenumber: React.FC<{ housenumberLayer: VectorTileLayer }> = ({
  housenumberLayer,
}) => {
  const { visible } = useControls("Housenumber", {
    visible: true,
  });

  // define a building struct
  interface Housenumber {
    x: number;
    y: number;
    housenumber: string;
  }
  let houseNumberList = [];

  for (let i = 0; i < housenumberLayer.length; i++) {
    const feature = housenumberLayer.feature(i);
    const location = feature.loadGeometry()[0][0];
    const housenumber: Housenumber = {
      x: location.x * featureScale,
      y: -location.y * featureScale,
      housenumber: feature.properties.housenumber,
    };
    houseNumberList.push(housenumber);
  }
  //console.log(houseNumberList);

  return (
    <group visible={visible} renderOrder={10}>
      {houseNumberList.map((housenumber, index) => {
        return (
          <Billboard
            key={index}
            position={[housenumber.x, 10, -housenumber.y]}
            follow={true}
            lockX={false}
            lockY={false}
            lockZ={false} // Lock the rotation on the z axis (default=false)
          >
            <Text fontSize={3} color="black">
              {housenumber.housenumber}
            </Text>
          </Billboard>
        );
      })}
    </group>
  );
};
export default Housenumber;
