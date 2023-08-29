'use client'

import { Canvas } from '@react-three/fiber'
import { Stats, MapControls, Environment } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import { useControls } from 'leva'
import gsap from 'gsap'
import Floor from '@/components/Floor'
import Buildings from '@/components/Buildings'
import Landcover from '@/components/Landcover'
import Water_areas from '@/components/Water_areas'
import Roads from '@/components/Roads'

export default function App() {
    
    // set the state variable
    const [popUp, setPopUp] = useState(null)
    
    // calculate the map origin point
    const mapOriginLngLat = [103.88544,1.39232]
    const mapOriginMercator = maplibregl.MercatorCoordinate.fromLngLat( mapOriginLngLat , 0 )
    
    // calculate scale so that we can use meters as unit
    const scale = 1 / mapOriginMercator.meterInMercatorCoordinateUnits()
    const mapOrigin = [mapOriginMercator.x * scale, mapOriginMercator.y * scale]

    //declare the UI parameters
    const { sunLightIntensity,castShadow } = useControls("Scene", {
        sunLightIntensity: { value:1, min:0, max:3, step: 0.05},
        castShadow: true,
    })

    // access the UI popup  
    useEffect(() => {
        const popUp = document.querySelector('#popUp')
        setPopUp(popUp)
    },[])
    
    return (
        <Canvas 
            shadows
            frameloop="demand"
            camera={{ position: [0, 0, 1000], 
                      zoom: 2, 
                      up: [0, 0, 1], 
                      far: 10000 }}
            
            onPointerMove={(e) => {
                gsap.set(popUp, {
                    x: e.clientX,
                    y: e.clientY
                })
            }}
        >
           <Suspense fallback={null}>
                <Floor />
                <Landcover 
                    url='data/landcover.geojson'
                    scale={scale}
                    origin={mapOrigin} 
                />
                <Water_areas 
                    url='data/water_areas.geojson'
                    scale={scale}
                    origin={mapOrigin} 
                />
                <Buildings 
                    url='data/buildings.geojson'
                    scale={scale}
                    origin={mapOrigin}
                    popUp={popUp} 
                />
                <Roads 
                    url='data/roads.geojson'
                    scale={scale}
                    origin={mapOrigin} 
                />
                <directionalLight
                    visible 
                    position={[500, 500, 500]} 
                    intensity={sunLightIntensity} 
                    castShadow={castShadow}
                    shadow-mapSize-width={1024} 
                    shadow-mapSize-height={1024}
                    shadow-camera-near={1}
                    shadow-camera-far={10000}
                    shadow-camera-left={-1000}
                    shadow-camera-right={1000}
                    shadow-camera-top={1000}
                    shadow-camera-bottom={-1000}
                />
                <Environment preset='city' />
            </Suspense>
            <MapControls enableRotate={true} />
            <Stats />
        </Canvas>
    )
}