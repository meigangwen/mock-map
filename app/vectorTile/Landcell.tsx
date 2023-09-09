import * as THREE from 'three'
import { useState, useEffect } from 'react'

export default function Landcell( { landData } ) {

    //declare the state hooks
    const [hovered, setHovered] = useState(false)
    const [shapes,setShapes] = useState([])
    //const [height, setHeight] = useState(0)
    //const [renderOrder, setRenderOrder] = useState(2)
    
    const [color, setColor] = useState(new THREE.Color("#909090"))
    //const [extrudeSettings,setExtrudeSettings] = useState({})
    
    //declare the UI parameters
    
    useEffect(() => {
        
        let shapes = []
        for (let i = 0; i < landData.length; i++){
            const ring = landData[i]
            const shape = new THREE.Shape()
            
            // move to the first point
            shape.moveTo(ring[0].x, ring[0].y) 
            for (let j = 1; j < ring.length; j++) {
                shape.lineTo(ring[j].x, ring[j].y)
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