'use client'

import { Canvas } from '@react-three/fiber'
import { Stats, MapControls } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import Svg from '@/components/Svg'
import Buildings from '@/components/Buildings'
import maplibregl from 'maplibre-gl'
import * as THREE from 'three'


export default function App() {
    
    // calculate the map origin point
    const mapOrigin = [103.88544,1.39232]
    const mapOriginMercator = maplibregl.MercatorCoordinate.fromLngLat( mapOrigin , 0 )

    return (
        <Canvas 
            frameloop="demand" 
            camera={{ position: [mapOriginMercator.x, mapOriginMercator.y, 100], 
                      zoom: 2, 
                      up: [0, 0, 1], 
                      far: 10000 }}
        >
            <Suspense fallback={null}>
                <Buildings url='data/buildings.geojson'/>
            </Suspense>
            <MapControls enableRotate={true} />
            <axesHelper args={[5]} />
            <gridHelper rotation-x={Math.PI / 2} />
            <Stats />
        </Canvas>
    )
}