'use client'

import { Canvas } from '@react-three/fiber'
import { MapControls } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
//import Svg from '@/components/Svg'
import Buildings from '@/components/Buildings'
import maplibregl from 'maplibre-gl'

export default function App() {
    
    // calculate the map origin point
    const mapOrigin = [103.88544,1.39232]
    const mapOriginMercator = maplibregl.MercatorCoordinate.fromLngLat( mapOrigin , 0 )

    //console.log(mapOriginMercator)

    
    /*
    function fetchJSON(url) {
        return fetch(url)
          .then(function(response) {
            return response.json();
          })
    }

    useEffect(() => {
        var geoData = fetchJSON('data/addresses.geojson')
            .then(function(data) { 

        data.features.forEach(function(feature) {
                console.log(feature)
                var symbol = feature.properties['icon']
                console.log(symbol)
        })

    })

    },[])
    */
    
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