'use client'

//import { useVectorTileLoader } from "./VectorTileLoader"
import Protobuf from 'pbf'
import { VectorTile, VectorTileLayer, VectorTileFeature } from '@mapbox/vector-tile'
import { useState, useEffect } from 'react'

async function loadVectorTile(url: string): Promise<VectorTile> {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return new VectorTile(new Protobuf(buffer));
}

export default function App() {

    const url = "https://tileserver.yilumi.com/data/singapore/14/12914/8132.pbf"
    const [tile, setTile] = useState<VectorTile | null>(null)

    useEffect(() => {
        loadVectorTile(url)
        .then(loadedTile => {
            setTile(loadedTile)
            
            // load the layers into memory
            const buildingLayer = loadedTile.layers.building
            for (let i=0;i<buildingLayer.length;i++){
                console.log(buildingLayer.feature(i).loadGeometry())
            }
        })
    },[url])
   

    //console.log(tile)
    return (
        <>
        </>
    )
}