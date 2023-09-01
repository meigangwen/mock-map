'use client'

//import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, MapControls } from '@react-three/drei'
import ShapeWithHole from './ShapeWithHole'
import MultipleShapes from './MultipleShapes'

export default function App() {

    return (
        <Canvas
            camera={{ position: [0, 0, 100], 
                      zoom: 2, 
                      up: [0, 0, 1], 
                      far: 10000 }}>
            
            <ShapeWithHole position={[-10,-10,0]}/>
            <MultipleShapes position={[10,10,0]}/>
            <MapControls enableRotate={true} />
            <Stats />
        </Canvas>
    )
}