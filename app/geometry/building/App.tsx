'use client'

//import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, MapControls } from '@react-three/drei'
import Building from './Building'
import Floor from './Floor'

export default function App() {

    return (
        <Canvas
            camera={{ position: [0, 0, 100], 
                      zoom: 2, 
                      up: [0, 0, 1], 
                      far: 10000 }}>
            
            <Building />
            <Floor />
            <directionalLight
                    visible 
                    position={[5, 5, 10]} 
                    intensity={1.0} 
                    castShadow
                />
            <ambientLight
                    visible
                    intensity={0.5}
                />
            <MapControls enableRotate={true} />
            <Stats />
        </Canvas>
    )
}