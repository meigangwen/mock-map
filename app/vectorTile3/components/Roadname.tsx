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

  // define a building struct
  /*
  interface Housenumber {
    x: number;
    y: number;
    housenumber: string;
  }
  let houseNumberList = [];
  */

  for (let i = 0; i < roadnameLayer.length; i++) {
    const feature = roadnameLayer.feature(i);
    //const location = feature.loadGeometry()[0][0];
    console.log(feature.properties.name);
    console.log(feature.loadGeometry());
  }
  //console.log(houseNumberList);

  return <group visible={visible} renderOrder={10}></group>;
};
export default Roadname;
