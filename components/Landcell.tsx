import * as THREE from 'three'
import { useState, useEffect } from 'react'
import { useControls } from 'leva'

export default function Landcell( { landData } ) {

    //declare the state hooks
    const [hovered, setHovered] = useState(false)
    const [shape,setShape] = useState(new THREE.Shape())
    const [height, setHeight] = useState(0)
    const [color, setColor] = useState(new THREE.Color('#808080'))
    //const [extrudeSettings,setExtrudeSettings] = useState({})

    //declare the UI parameters
    
    /*
    const { color } = useControls("Landcover", {
        color: {value:"#808080"}
    })*/
    

    useEffect(() => {
         // get the land data
         const coordinates = landData.geometry.coordinates[0]
         const length = coordinates.length
         
         // get the land properties
         const { leisure } = landData.properties
         //console.log( leisure ) 
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

        /*
        // extrudeSettings
        const extrudeSettings = {
            steps: 1,
            depth: height,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        }
        */
        if (leisure === 'park') {
            setColor(new THREE.Color("#00ff00"))
        } else {
            if (leisure === 'swimming_pool') {
                setColor(new THREE.Color("#1eb4ff"))
                setHeight(1)
            }
            if (leisure === 'sports_centre') {
                setColor(new THREE.Color('yellow'))
            }
            if (leisure === 'pitch') {
                setColor(new THREE.Color('#00ff00'))
                setHeight(1)
            }
        }

         // maybe we need to useMemo to not let these shapes keep on redrawing 
         setShape(shape)
         //setExtrudeSettings(extrudeSettings)
    },[])
    
    return (
        <mesh
            position = {[0,0,height]} 
            receiveShadow
            onPointerOver={(e) => {
                setHovered(true)
                e.stopPropagation()
            }} 
            onPointerOut={() => setHovered(false)} >
            <meshStandardMaterial 
                color={hovered? 'red':color} 
                side={THREE.FrontSide} 
                roughness={1.0} />
            <shapeGeometry args={[shape]} />
        </mesh>
    )
}