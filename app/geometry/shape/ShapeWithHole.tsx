import { useState, useEffect } from 'react'
import * as THREE from 'three'

export default function ShapeWithHole({...props}) {

    const [shape, setShape] = useState(new THREE.Shape())

    useEffect(() => {
        let shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, 10);
        shape.lineTo(10, 10);
        shape.lineTo(10, 0);
        shape.lineTo(0, 0);

        // Create a hole
        var hole = new THREE.Path();
        hole.moveTo(2, 2);
        hole.lineTo(2, 8);
        hole.lineTo(8, 8);
        hole.lineTo(8, 2);
        hole.lineTo(2, 2);

        // Add the hole to the shape
        shape.holes.push(hole);

        setShape(shape)

    },[])

    return (
        <mesh {...props}>
            <meshBasicMaterial color='red' />
            <shapeGeometry args={[shape]} />
        </mesh>
    )
}