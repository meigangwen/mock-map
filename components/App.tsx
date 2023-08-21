'use client'

import { Canvas } from '@react-three/fiber'
import { MapControls } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import Svg from '@/components/Svg'


export default function App() {
    
    
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

    
    return (
        <Canvas 
            frameloop="demand" 
            camera={{ position: [0, 0, 100], 
                      zoom: 2, 
                      up: [0, 0, 1], 
                      far: 10000 }}
        >
            <Suspense fallback={null}>
                <Svg url="./svg/map.svg" />
            </Suspense>
            <MapControls enableRotate={true} />
        </Canvas>
    )
}