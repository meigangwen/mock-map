'use client'

import { Canvas } from '@react-three/fiber'
import { Stats, MapControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import maplibregl from 'maplibre-gl'
import { useControls } from 'leva'
import gsap from 'gsap'
import Floor from '@/components/Floor'
import Buildings from '@/components/Buildings'
import Landcover from '@/components/Landcover'
import Water_areas from '@/components/Water_areas'
import Roads from '@/components/Roads'

export default function App() {
    
    // calculate the map origin point
    const mapOriginLngLat = [103.88544,1.39232]
    const mapOriginMercator = maplibregl.MercatorCoordinate.fromLngLat( mapOriginLngLat , 0 )
    
    // calculate scale so that we can use meters as unit
    const scale = 1 / mapOriginMercator.meterInMercatorCoordinateUnits()
    const mapOrigin = [mapOriginMercator.x * scale, mapOriginMercator.y * scale]

    //<Environment preset="city" />
    
    //declare the UI parameters
    const { castShadow } = useControls("Scene", {
        castShadow: true,
    })

    // access the UI popup
    //const popUp = document.querySelector('#popUp')
    //console.log(popUp)
    
    return (
        <Canvas 
            shadows
            frameloop="demand"
            camera={{ position: [0, 0, 1000], 
                      zoom: 2, 
                      up: [0, 0, 1], 
                      far: 10000 }}
            /*
            onPointerMove={(e) => {
                //mouse.x = ((e.clientX - innerWidth / 2) / (innerWidth / 2)) * 2 - 1
                //mouse.y = - (e.clientY / innerHeight) * 2 + 1
                gsap.set(popUp, {
                    x: e.clientX,
                    y: e.clientY
                })
                //console.log('hello')
            }}*/
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
                />
                <Roads 
                    url='data/roads.geojson'
                    scale={scale}
                    origin={mapOrigin} 
                />
                <directionalLight
                    visible 
                    position={[500, 500, 500]} 
                    intensity={1} 
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
                <Environment preset="city" />
            </Suspense>
            <MapControls enableRotate={true} />
            <Stats />
        </Canvas>
    )
}