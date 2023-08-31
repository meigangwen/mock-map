'use client'

// import libs
import Protobuf from 'pbf'
import { VectorTile, VectorTileLayer, VectorTileFeature } from '@mapbox/vector-tile'
import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, MapControls, Environment } from '@react-three/drei'

// import components
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
    
    useEffect(() => {
        loadVectorTile(url)
        .then(loadedTile => {
            setTile(loadedTile)
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
                <Buildings buildingLayer={tile?.layers.building} />
            </Suspense>
            <MapControls enableRotate={true} />
            <Stats />
        </Canvas>
    )
}