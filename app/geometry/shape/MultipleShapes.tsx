import { useState, useEffect } from 'react'
import * as THREE from 'three'

export default function MultipleShapes({...props}) {

    const [shapes, setShapes] = useState([])

    useEffect(() => {

        let shapes = []
        // Create the first shape
        var shape1 = new THREE.Shape();
        shape1.moveTo(0, 0);
        shape1.lineTo(0, 10);
        shape1.lineTo(10, 10);
        shape1.lineTo(10, 0);
        shape1.lineTo(0, 0);

        // Create the second shape
        var shape2 = new THREE.Shape();
        shape2.moveTo(20, 0);
        shape2.lineTo(20, 10);
        shape2.lineTo(30, 10);
        shape2.lineTo(30, 0);
        shape2.lineTo(20, 0);
        
        shapes.push(shape1)
        shapes.push(shape2)

        setShapes(shapes)

    },[])

    return (
        <mesh {...props}>
            <meshBasicMaterial color='red' />
            <shapeGeometry args={[shapes]} />
        </mesh>
    )
}