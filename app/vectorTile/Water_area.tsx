import * as THREE from 'three'
import { useState, useEffect } from 'react'

// import constants
import {scale} from './Scale'

export default function Water_area( { waterData } ) {

    //declare the state hooks
    const [hovered, setHovered] = useState(false)
    const [shapes,setShapes] = useState([])
    //const [height, setHeight] = useState(0)
    //const [renderOrder, setRenderOrder] = useState(2)
    
    const [color, setColor] = useState(new THREE.Color("#909090"))
    //const [extrudeSettings,setExtrudeSettings] = useState({})
    
    //declare the UI parameters
    
    useEffect(() => {
        console.log(waterData.properties.class)
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
            renderOrder={1}
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
                depthTest={false} />
            <shapeGeometry args={[shapes]} />
        </mesh>
    )
}