"use client";

// import libs
import Protobuf from "pbf";
import {
  VectorTile,
  VectorTileLayer,
  VectorTileFeature,
} from "@mapbox/vector-tile";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats, MapControls, Environment } from "@react-three/drei";
import { useControls } from "leva";

// import components, layers are in order
import Background from "./components/Background";
import Water from "./components/Water";
import Canvas2d from "./components/Canvas2d";
import Landcover from "./components/Landcover";
import Road from "./components/Road";
import Building from "./components/Building";

// import lights
import Sunlight from "./components/Sunlight";

// import constants
import { zoomScale, featureScale, extent } from "./constants/Scale";

// import perf monitor
import { Perf } from "r3f-perf";

async function loadVectorTile(url: string): Promise<VectorTile> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return new VectorTile(new Protobuf(buffer));
}

export default function App() {
  // set the vector tile to be loaded
  const url = "https://tileserver.yilumi.com/data/singapore/14/12914/8132.pbf";
  // set the state hook for loading the tile
  const [tile, setTile] = useState<VectorTile | null>(null);
  // declare the UI parameters
  const { castShadow } = useControls("Scene", {
    castShadow: true,
  });

  useEffect(() => {
    loadVectorTile(url).then((loadedTile) => {
      setTile(loadedTile);
      //console.log(loadedTile);
    });
  }, []);

  // calculate the half length of tile side in meters
  const offset = (extent * featureScale) / 2;

  return (
    <Canvas
      shadows
      //frameloop="demand"
      camera={{
        position: [0, 1000, 0],
        zoom: 2,
        up: [0, 1, 0],
        far: 20000,
      }}
    >
      <group position={[-offset, 0, -offset]} rotation={[-Math.PI / 2, 0, 0]}>
        <Background position={[offset, -offset, 0]} />
        {tile && tile.layers && tile.layers.water && (
          <Water waterLayer={tile.layers.water} />
        )}
        {tile && <Canvas2d tile={tile} position={[offset, -offset, 0]} />}
        {tile && tile.layers && tile.layers.landcover && (
          <Landcover landcoverLayer={tile.layers.landcover} />
        )}
        {tile && tile.layers && tile.layers.transportation && (
          <Road roadLayer={tile.layers.transportation} />
        )}
        {tile && tile.layers && tile.layers.building && (
          <Building buildingLayer={tile.layers.building} />
        )}
      </group>

      <Sunlight />
      <ambientLight intensity={0.2} />
      <Environment preset="forest" />
      <MapControls enableRotate={true} />
      <Stats />
      <Perf />
    </Canvas>
  );
}
