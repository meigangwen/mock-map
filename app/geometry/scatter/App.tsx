'use client'

//import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, MapControls } from '@react-three/drei'
import Shapes from './Shapes'
import Scatter from './Scatter'

export default function App() {

    return (
        <Canvas
            camera={{ position: [0, 0, 100], 
                      zoom: 2, 
                      up: [0, 0, 1], 
                      far: 10000 }}>
        
            <Shapes />
            <Scatter />
            <MapControls enableRotate={true} />
            <Stats />
        </Canvas>
    )
}