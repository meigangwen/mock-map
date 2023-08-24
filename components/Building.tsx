import * as THREE from 'three'
import { useState, useEffect } from 'react'
import { useControls } from 'leva'

export default function Building( { buildingData } ) {

    //declare the state hooks
    const [hovered, setHovered] = useState(false)
    const [shape,setShape] = useState(new THREE.Shape())
    const [extrudeSettings,setExtrudeSettings] = useState({})

    //declare the UI parameters
    const { wireframe, color } = useControls("Buildings", {
        wireframe: false,
        color: {value:"#ffffff"}
    })

    useEffect(() => {
         // get the building geo data
         const coordinates = buildingData.geometry.coordinates[0]
         const length = coordinates.length
         
         // get the building properties
         const { amenity, building, name, power, parking, residential } = buildingData.properties
         const housenumber = buildingData.properties["addr:housenumber"]
         const postcode = buildingData.properties["addr:postcode"]
         const street = buildingData.properties["addr:street"]
         const levels = buildingData.properties["building:levels"]
         
         //console.log(housenumber, street, postcode, parking, residential, levels, amenity, building, name, power)
 
         const shape = new THREE.Shape()
        // move to the first point
         shape.moveTo(coordinates[0].x, coordinates[0].y) 
         for (let i = 1; i < length; i++) {
             shape.lineTo(coordinates[i].x, coordinates[i].y)
         }
         shape.lineTo(coordinates[0].x, coordinates[0].y)

        // calculate the building height
        let height = 45

        if (parking==="multi-storey") {
            height = 20
        } 
        else {
            if (residential != null){
                if (residential.toLowerCase()==="hdb" || residential.toLowerCase()==="condominium"){
                    if(levels != null) {
                        if (residential.toLowerCase()==="hdb") {
                            height = Number(levels) * 2.6
                        }
                        if (residential.toLowerCase()==="condominium") {
                            height = Number(levels) * 3
                        }
                    }
                }
            }
            if (name != null) {
                height = 20
            }
            if (power != null) {
                height = 15
            }
        }

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

         // maybe we need to useMemo to not let these shapes keep on redrawing 
         setShape(shape)
         setExtrudeSettings(extrudeSettings)
    },[])
    
    return (
        <mesh 
            receiveShadow
            castShadow
            onPointerOver={(e) => {
                setHovered(true)
                e.stopPropagation()
            }} 
            onPointerOut={() => setHovered(false)} >
            <meshStandardMaterial 
                color={hovered? 'red':color} 
                side={THREE.FrontSide} 
                //shadowSide={THREE.DoubleSide}
                wireframe={wireframe} 
                roughness={1.0}
                envMapIntensity={1} 
                />
            <extrudeGeometry args={[shape, extrudeSettings]} />
        </mesh>
    )
}