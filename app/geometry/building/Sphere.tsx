import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Sphere(){
    
    const matRef = useRef()

    useEffect( () => {
        //console.log(matRef.current)
    })

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