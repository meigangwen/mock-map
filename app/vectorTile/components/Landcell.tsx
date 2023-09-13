import * as THREE from 'three'
import { useState, useEffect } from 'react'

// import constants
import {scale} from '../constants/Scale'

export default function Landcell( { landData } ) {

    //declare the state hooks
    const [hovered, setHovered] = useState(false)
    const [shapes,setShapes] = useState([])
    const [height, setHeight] = useState(0)
    const [renderOrder, setRenderOrder] = useState(2)
    
    const [color, setColor] = useState(new THREE.Color("#909090"))
    //const [extrudeSettings,setExtrudeSettings] = useState({})
    
    //declare the UI parameters
    
    useEffect(() => {
        //console.log(landData.properties)
        let shapes = []
        for (let i = 0; i < landData.loadGeometry().length; i++){
            const ring = landData.loadGeometry()[i]
            const shape = new THREE.Shape()
            
            // move to the first point
            shape.moveTo(-ring[0].x * scale, ring[0].y * scale) 
            for (let j = 1; j < ring.length; j++) {
                shape.lineTo(-ring[j].x * scale, ring[j].y * scale)
            }
            shapes.push(shape)
        }
        
         // maybe we need to useMemo to not let these shapes keep on redrawing
         switch(landData.properties.class) {
            case "grass":
              setColor('#00ff00')
              break;
            case "wood":
              setColor('#009900')
              setHeight(0.1)
              setRenderOrder(3)
              break;
            case 'sand':
              setColor('#FFFF00')
              setHeight(0.1)
              setRenderOrder(2)
              break;  
            default:
              // code block
          }
         setShapes(shapes)
    },[])
    
    return (
        <mesh
            position = {[0,0,height]}
            renderOrder={renderOrder}
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