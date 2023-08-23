import * as THREE from 'three'

export default function Building( { coordinates } ) {

    const shape = new THREE.Shape()
    const length = coordinates.length
    
    // move to the first point
    shape.moveTo(coordinates[0].x, coordinates[0].y) 
    for (let i = 1; i < length; i++) {
        shape.lineTo(coordinates[i].x, coordinates[i].y)
    }
    shape.lineTo(coordinates[0].x, coordinates[0].y)
    
    return (
        <mesh >
            <meshBasicMaterial color='red' side={THREE.DoubleSide} />
            <shapeGeometry args={[shape]} />
        </mesh>
    )
}