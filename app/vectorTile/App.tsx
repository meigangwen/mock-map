'use client'

// import libs
import Protobuf from 'pbf'
import { VectorTile, VectorTileLayer, VectorTileFeature } from '@mapbox/vector-tile'
import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, MapControls, Environment } from '@react-three/drei'
import { useControls } from 'leva'

// import components
import Floor from './Floor'
import Landcover from './Landcover'
import Buildings from './Buildings'

async function loadVectorTile(url: string): Promise<VectorTile> {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return new VectorTile(new Protobuf(buffer));
}

export default function App() {

    // set the vector tile to be loaded
    const url = "https://tileserver.yilumi.com/data/singapore/14/12914/8132.pbf"

    // set the state hook for loading the tile
    const [tile, setTile] = useState<VectorTile | null>(null)

    // set the extent of our vector tile, which is 4096 in this case
    const extent = 4096

    //declare the UI parameters
    const { castShadow } = useControls("Scene", {
        castShadow: true,
    })
    
    useEffect(() => {
        loadVectorTile(url)
        .then(loadedTile => {
            setTile(loadedTile)
            //console.log(loadedTile)
        })
    },[url])
   
    return (
        <Canvas
            shadows
            frameloop="demand"
            camera={{ position: [extent/2, extent/2, 1000], 
                      zoom: 2, 
                      up: [0, 0, 1], 
                      far: 20000 }}>
            <Suspense fallback={null}>
                <Floor position={[extent/2, extent/2, 0]} />
                <Landcover landcoverLayer={tile?.layers.landcover} />
                <Buildings buildingLayer={tile?.layers.building} />
                <directionalLight
                    visible 
                    position={[500, 500, 500]} 
                    intensity={1.0} 
                    castShadow={castShadow}
                    shadow-mapSize-width={2048} 
                    shadow-mapSize-height={2048}
                    shadow-camera-near={1}
                    shadow-camera-far={10000}
                    shadow-camera-left={-4096}
                    shadow-camera-right={4096}
                    shadow-camera-top={4096}
                    shadow-camera-bottom={-4096}
                />
                <Environment preset='city' />
            </Suspense>
            <MapControls enableRotate={true} />
            <Stats />
        </Canvas>
    )
}