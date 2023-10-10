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
import Road from "./components/Road";
import Building from "./components/Building";

// import constants
import { zoomScale, featureScale, extent } from "./constants/Scale";

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
    });
  }, []);

  //<Environment preset="city" background />
  //<hemisphereLight intensity={1} color="#ffffff" groundColor="#000000" />
  return (
    <Canvas
      shadows
      //frameloop="demand"
      camera={{
        position: [
          (-extent * featureScale) / 2,
          1000,
          (extent * featureScale) / 2,
        ],
        zoom: 2,
        up: [0, 1, 0],
        far: 20000,
      }}
    >
      <group
        position={[
          -(extent * featureScale) / 2,
          0,
          -(extent * featureScale) / 2,
        ]}
        rotation={[Math.PI / 2, Math.PI, 0]}
      >
        <Floor
          position={[
            (-extent * featureScale) / 2,
            (extent * featureScale) / 2,
            0,
          ]}
        />
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
      <directionalLight
        visible
        position={[50, 300, 50]}
        intensity={1.0}
        castShadow={castShadow}
        //shadow-mapSize-width={2048}
        //shadow-mapSize-height={2048}
        //shadow-camera-near={1}
        //shadow-camera-far={1000}
        //shadow-camera-left={-1200}
        //shadow-camera-right={1200}
        //shadow-camera-top={1200}
        //shadow-camera-bottom={-1200}
      />

      <Environment preset="forest" background />
      <MapControls enableRotate={true} />
      <Stats />
    </Canvas>
  );
}
