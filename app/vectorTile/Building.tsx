import * as THREE from 'three'
import { useState, useEffect } from 'react'

export default function Building( {buildingData} ) {

    //declare the state hooks
    const [shape,setShape] = useState(new THREE.Shape())
    
    useEffect(() => {
        
        // check if the length of buildingData is 1, if the array length is greater than 1, we may have shapes within shapes
        const firstRing = buildingData[0]
        console.log(firstRing)
        const shape = new THREE.Shape()
        // move to the first point
        shape.moveTo(firstRing[0].x, firstRing[0].y) 
        for (let i = 1; i < firstRing.length; i++) {
            shape.lineTo(firstRing[i].x, firstRing[i].y)
        }
        setShape(shape)
    },[])
    
    return (
        <mesh>
            <meshBasicMaterial color='red' />
            <shapeGeometry args={[shape]} />
        </mesh>
    )
}