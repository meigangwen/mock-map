import * as THREE from 'three'

export default function Building( { coordinates, scale, origin } ) {

    const shape = new THREE.Shape()
    const length = coordinates.length
    
    // move to the first point
    shape.moveTo(coordinates[0].x * scale - origin[0], coordinates[0].y * scale - origin[1]) 
    for (let i = 1; i < length; i++) {
        shape.lineTo(coordinates[i].x * scale  - origin[0], coordinates[i].y * scale  - origin[1])
    }
    shape.lineTo(coordinates[0].x * scale - origin[0], coordinates[0].y * scale - - origin[1])
    
    return (
        <mesh >
            <meshBasicMaterial color='red' side={THREE.DoubleSide} />
            <shapeGeometry args={[shape]} />
        </mesh>
    )
}