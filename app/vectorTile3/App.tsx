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

// import components
import Floor from "./components/Floor";
import Shadow from "./components/Shadow";
import Water from "./components/Water";
import Landcover from "./components/Landcover";
import Road from "./components/Road";
import Building from "./components/Building";
import Housenumber from "./components/Housenumber";
import Roadname from "./components/Roadname";

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
      console.log(loadedTile);
    });
  }, []);

  // calculate the half length of tile side in meters
  const offset = (extent * featureScale) / 2;

  /*
  <group position={[-offset, 0, -offset]}>
    {tile && tile.layers && tile.layers.housenumber && (
      <Housenumber housenumberLayer={tile.layers.housenumber} />
    )}
    {tile && tile.layers && tile.layers.transportation_name && (
      <Roadname roadnameLayer={tile.layers.transportation_name} />
    )}
  </group>
  */

  /*
  <directionalLight
      visible
      position={[150, 750, 150]}
      intensity={1.0}
      castShadow={castShadow}
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-camera-near={1}
      shadow-camera-far={1500}
      shadow-camera-left={-2000}
      shadow-camera-right={2000}
      shadow-camera-top={2000}
      shadow-camera-bottom={-2000}
  />
  */

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
        <Floor position={[offset, -offset, 0]} />
        {tile && tile.layers && tile.layers.water && (
          <Water waterLayer={tile.layers.water} />
        )}
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
