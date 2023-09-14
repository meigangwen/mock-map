import { useState, useEffect } from 'react'
import * as THREE from 'three'

export default function Shapes({...props}) {

    const [shapes, setShapes] = useState([])

    useEffect(() => {

        let shapes = []
        // Create the first shape
        var shape1 = new THREE.Shape();
        shape1.moveTo(0, 0);
        shape1.lineTo(0, 10);
        shape1.lineTo(10, 10);
        shape1.lineTo(15, 0);
        shape1.lineTo(10, -5);
        shape1.lineTo(0, 0);
        shapes.push(shape1)

        setShapes(shapes)

    },[])

    return (
        <mesh {...props}>
            <meshBasicMaterial color='red' />
            <shapeGeometry args={[shapes]} />
        </mesh>
    )
}