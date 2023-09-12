import * as THREE from 'three'
import { useState, useEffect } from 'react'
import { useControls } from 'leva'

// import constants
import {scale} from './Scale'

export default function Water_area( { waterData } ) {

    //declare the state hooks
    const [hovered, setHovered] = useState(false)
    const [shapes,setShapes] = useState([])
    //const [height, setHeight] = useState(0)
    //const [renderOrder, setRenderOrder] = useState(2)
    
    //const [color, setColor] = useState(new THREE.Color("#1eb4ff"))
    //const [extrudeSettings,setExtrudeSettings] = useState({})
    
    //declare the UI parameters 
     const { visible, depth, color } = useControls("Water", {
        visible: true,
        depth: { value:5, min:0, max:20, step: 0.1},
        color: {value:"#1eb4ff"}
    })

    const extrudeSettings = {
        steps: 1,
        depth: -depth,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    }
    
    useEffect(() => {
        //console.log(waterData.properties.class)
        let shapes = []
        for (let i = 0; i < waterData.loadGeometry().length; i++){
            const ring = waterData.loadGeometry()[i]
            const shape = new THREE.Shape()
            
            // move to the first point
            shape.moveTo(-ring[0].x * scale, ring[0].y * scale) 
            for (let j = 1; j < ring.length; j++) {
                shape.lineTo(-ring[j].x * scale, ring[j].y * scale)
            }
            shapes.push(shape)
        }
        
         // maybe we need to useMemo to not let these shapes keep on redrawing 
         setShapes(shapes)
    },[])
    
    return (
        <mesh
            visible={visible}
            renderOrder={4}
            receiveShadow
            onPointerOver={(e) => {
                setHovered(true)
                e.stopPropagation()
            }} 
            onPointerOut={() => {
                setHovered(false)  
            }} >
            <meshStandardMaterial 
                color={hovered? 'red':color} 
                side={THREE.FrontSide}
                roughness={0.1} 
                depthTest={false} />

            <extrudeGeometry args={[shapes, extrudeSettings]} />
        </mesh>
    )
}