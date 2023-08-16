'use client'

import { Canvas } from '@react-three/fiber'
import { MapControls } from '@react-three/drei'
import { Suspense } from 'react'
import Svg from '@/components/Svg'

export default function App() {
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