import * as THREE from 'three'
import { useState, useEffect } from 'react'

// import constants
import {scale} from '../constants/Scale'

// import functions
import {signedArea} from '../functions/Polygon'

export default function Building( {buildingData} ) {

    //declare the state hooks
    const [hovered, setHovered] = useState(false)
    const [shapes, setShapes] = useState([])
    const [color, setColor] = useState('#FFFFFF')
    const [height, setHeight] = useState(0)
    const [extrudeSettings,setExtrudeSettings] = useState({})
     
    useEffect(() => {
       
        console.log(buildingData.id)
        let shapes = [],
            shape

        for (let i = 0; i < buildingData.loadGeometry().length; i++){
            const ring = buildingData.loadGeometry()[i]
            const area = signedArea(ring)
            if  (area > 0 ){

                // this area is a shape
                shape = new THREE.Shape()
                // move to the first point
                shape.moveTo(-ring[0].x * scale, ring[0].y * scale) 
                for (let j = 1; j < ring.length; j++) {
                    shape.lineTo(-ring[j].x * scale, ring[j].y * scale)
                }
                shapes.push(shape)
            }
            if ( area < 0 ){
                // this area is a hole, which needs to be attached to the previous shape
                const hole = new THREE.Path()
                hole.moveTo(-ring[0].x * scale, ring[0].y * scale) 
                for (let j = 1; j < ring.length; j++) {
                    hole.lineTo(-ring[j].x * scale, ring[j].y * scale)
                }
                shape?.holes.push(hole)
                shapes.pop()
                shapes.push(shape)
            }
        }
        setShapes(shapes)

        // calculate the building height
        const depth = (buildingData.properties.render_height - buildingData.properties.render_min_height)
        const height = buildingData.properties.render_min_height
        setHeight(height)
        
        // extrudeSettings
        const extrudeSettings = {
            steps: 1,
            depth: depth,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        }
        setExtrudeSettings(extrudeSettings)

        // set the color

        if ('colour' in buildingData.properties){
            setColor(buildingData.properties.colour)
        }

    },[])
    
    return (
        <mesh 
            position = {[0,0,height]}
            receiveShadow
            castShadow
            renderOrder={10}
            onPointerOver={(e) => {
                setHovered(true)
                e.stopPropagation()
            }} 
            onPointerOut={() => {
                setHovered(false)
            }} >
            <meshStandardMaterial color={hovered?'red':color} />
            <extrudeGeometry args={[shapes, extrudeSettings]} />
        </mesh>
    )
}