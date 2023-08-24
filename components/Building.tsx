import * as THREE from 'three'
import { useState, useEffect } from 'react'

export default function Building( { buildingData } ) {

    const [hovered, setHovered] = useState(false)
    const shape = new THREE.Shape()

    // get the building geo data
    const coordinates = buildingData.geometry.coordinates[0]
    const length = coordinates.length
    
    // get the building properties
    const { amenity, building, name, power, parking, residential } = buildingData.properties
    const housenumber = buildingData.properties["addr:housenumber"]
    const postcode = buildingData.properties["addr:postcode"]
    const street = buildingData.properties["addr:street"]
    const levels = buildingData.properties["building:levels"]
    
    console.log(housenumber, street, postcode, parking, residential, levels, amenity, building, name, power)

    // move to the first point
    shape.moveTo(coordinates[0].x, coordinates[0].y) 
    for (let i = 1; i < length; i++) {
        shape.lineTo(coordinates[i].x, coordinates[i].y)
    }
    shape.lineTo(coordinates[0].x, coordinates[0].y)

    // maybe we need to useMemo to not let these shapes keep on redrawing 
    
    return (
        <mesh 
            onPointerOver={() => setHovered(true)} 
            onPointerOut={() => setHovered(false)} >
            <meshBasicMaterial color={hovered? 'red':'blue'} side={THREE.FrontSide} />
            <shapeGeometry args={[shape]} />
        </mesh>
    )
}