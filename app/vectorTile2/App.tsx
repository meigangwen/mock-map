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
import Water from "./components/Water";
import Landcover from "./components/Landcover";
//import Buildings from "./components/Buildings";
//import Roads from "./components/Roads";

// import constants
import { scale, extent } from "./constants/Scale";

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
    castShadow: false,
  });

  useEffect(() => {
    loadVectorTile(url).then((loadedTile) => {
      setTile(loadedTile);
    });
  }, []);

  return (
    <Canvas
      shadows
      //frameloop="demand"
      camera={{
        position: [(-extent * scale) / 2, (extent * scale) / 2, 1000],
        zoom: 2,
        up: [0, 0, 1],
        far: 20000,
      }}
    >
      <Floor position={[(-extent * scale) / 2, (extent * scale) / 2, 0]} />
      {tile && tile.layers && tile.layers.water && (
        <Water waterLayer={tile.layers.water} />
      )}
      <directionalLight
        visible
        position={[(-extent * scale) / 2, (extent * scale) / 2, 2000]}
        intensity={1.0}
        castShadow={castShadow}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={10000}
        shadow-camera-left={-5000}
        shadow-camera-right={5000}
        shadow-camera-top={5000}
        shadow-camera-bottom={-5000}
      />
      <Environment preset="city" />
      <MapControls enableRotate={true} />
      <Stats />
    </Canvas>
  );
}