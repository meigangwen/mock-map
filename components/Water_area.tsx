import * as THREE from 'three'
import { useState, useEffect } from 'react'
import { useControls } from 'leva'

export default function Water_area( { waterData } ) {

    //declare the state hooks
    const [hovered, setHovered] = useState(false)
    const [shape,setShape] = useState(new THREE.Shape())
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
         // get the land data
         const coordinates = waterData.geometry.coordinates[0]
         const length = coordinates.length
         
         // get the land properties
         /*
         const { amenity, building, name, power, parking, residential } = buildingData.properties
         const housenumber = buildingData.properties["addr:housenumber"]
         const postcode = buildingData.properties["addr:postcode"]
         const street = buildingData.properties["addr:street"]
         const levels = buildingData.properties["building:levels"]
         
         console.log(housenumber, street, postcode, parking, residential, levels, amenity, building, name, power)
        */
        
        const shape = new THREE.Shape()
        // move to the first point
         shape.moveTo(coordinates[0].x, coordinates[0].y) 
         for (let i = 1; i < length; i++) {
             shape.lineTo(coordinates[i].x, coordinates[i].y)
         }
         shape.lineTo(coordinates[0].x, coordinates[0].y)

         // maybe we need to useMemo to not let these shapes keep on redrawing 
         setShape(shape)
         //setExtrudeSettings(extrudeSettings)
    },[])
    
    return (
        <mesh
            visible={visible}
            renderOrder={1} 
            receiveShadow 
            onPointerOver={(e) => {
                setHovered(true)
                e.stopPropagation()
            }} 
            onPointerOut={() => setHovered(false)} >
            <meshStandardMaterial 
                color={hovered? 'red':color} 
                side={THREE.FrontSide} 
                roughness={0.1} 
                depthTest={false} />
           
            <extrudeGeometry args={[shape, extrudeSettings]} />
        </mesh>
    )
}