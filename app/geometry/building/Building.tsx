import { useState, useEffect } from 'react'
import * as THREE from 'three'
import vertexShader from './shaders/custom/building_vertex.glsl'
import fragmentShader from './shaders/custom/building_fragment.glsl'

export default function Building() {

    const [shapes, setShapes] = useState([])

    const extrudeSettings = {
        steps: 1,
        depth: 50,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    }

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
        <mesh
            castShadow
        >
            <shaderMaterial 
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                side={THREE.FrontSide}
                uniforms={THREE.UniformsUtils.merge( [

                    THREE.UniformsLib['lights'],   // this is god damn important to have the bracket there, otherwise error
                    THREE.UniformsLib['fog'],
                ])}
                fog={true}
            />  
            <extrudeGeometry args={[shapes, extrudeSettings]} />
        </mesh>
    )
}