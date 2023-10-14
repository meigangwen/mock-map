import * as React from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { Text, Billboard } from "@react-three/drei";
import { ringToShape, ringToHole, signedArea } from "../functions/Polygon";
import { VectorTileLayer, VectorTileFeature } from "@mapbox/vector-tile";

const Housenumber: React.FC<{ housenumberLayer: VectorTileLayer }> = ({
  housenumberLayer,
}) => {
  const { visible } = useControls("Housenumber", {
    visible: true,
  });

  /*
  // define a building struct
  interface Building {
    min_height: number; //the starting height of the building
    height: number; //the actual height of the building, counting from the starting height
    color: string;
    shapes: [];
  }
  let buildingList = [];
  */

  for (let i = 0; i < housenumberLayer.length; i++) {
    const feature = housenumberLayer.feature(i);
    console.log(feature.properties.housenumber);
    console.log(feature.loadGeometry());
    //console.log()
  }

  return <group visible={visible} renderOrder={10}></group>;
};
export default Housenumber;
