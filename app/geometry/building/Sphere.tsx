import { useState, useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function Sphere(){
    
    const matRef = useRef()
    const state = useThree()

    useEffect( () => {
        //console.log(state.scene)
        //console.log(matRef)
    },[])

    return (
        <mesh 
            castShadow 
            position={[-20.0,-20.0,10.0]}
        >
                <meshStandardMaterial
                    ref = {matRef}
                    color='red' 
                />
                <sphereGeometry args={[5.0]} />
        </mesh>
    )
}