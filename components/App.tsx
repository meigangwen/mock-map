'use client'

import { Canvas } from '@react-three/fiber'
import { Stats, MapControls, Environment} from '@react-three/drei'
import { Suspense } from 'react'
import maplibregl from 'maplibre-gl'
import Buildings from '@/components/Buildings'

export default function App() {
    
    // calculate the map origin point
    const mapOriginLngLat = [103.88544,1.39232]
    const mapOriginMercator = maplibregl.MercatorCoordinate.fromLngLat( mapOriginLngLat , 0 )
    
    // calculate scale so that we can use meters as unit
    const scale = 1 / mapOriginMercator.meterInMercatorCoordinateUnits()
    const mapOrigin = [mapOriginMercator.x * scale, mapOriginMercator.y * scale]
    
    return (
        <Canvas 
            frameloop="demand"
            shadows
            camera={{ position: [0, 0, 1000], 
                      zoom: 2, 
                      up: [0, 0, 1], 
                      far: 10000 }}
        >
            <Suspense fallback={null}>
                <Buildings 
                    url='data/buildings.geojson'
                    scale={scale}
                    origin={mapOrigin} 
                />
                <Environment preset="city" />
            </Suspense>
            <directionalLight position={[500, 150, 300]} intensity={1} castShadow />
            <MapControls enableRotate={true} />
            <axesHelper args={[5]} />
            <gridHelper rotation-x={Math.PI / 2} />
            <Stats />
        </Canvas>
    )
}