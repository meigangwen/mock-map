'use client'

import { Canvas } from '@react-three/fiber'
import { MapControls } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import Svg from '@/components/Svg'
import Buildings from '@/components/Buildings'
import maplibregl from 'maplibre-gl'
import * as THREE from 'three'


export default function App() {
    
    // calculate the map origin point
    const mapOrigin = [103.88544,1.39232]
    const mapOriginMercator = maplibregl.MercatorCoordinate.fromLngLat( mapOrigin , 0 )

    // <Buildings url='data/buildings.geojson'/>
    // <Svg url='svg/map.svg' />
    //  <shapeGeometry args={[[0,0,0],[1,1,0],[1,2,0]]} />

    // <mesh >
    //     <meshBasicMaterial color='red' side={THREE.DoubleSide} />
    //     <shapeGeometry args={[shape]} />
    // </mesh>


    const shape = new THREE.Shape();
    shape.moveTo(0, 0.5);
    shape.lineTo(-0.5, -0.5);
    shape.lineTo(0.5, -0.5);
    shape.lineTo(0, 0.5);

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
        </Canvas>
    )
}