import * as THREE from 'three'

export default function Building( { coordinates } ) {

    const shape = new THREE.Shape()
    const length = coordinates.length
    const scale = 1000

    /*
    // move to the first point
    shape.moveTo(coordinates[0].x * scale, coordinates[0].y * scale)
    //shape.lineTo(coordinates[1].x * scale, coordinates[1].y * scale)
    //shape.lineTo(coordinates[2].x * scale, coordinates[2].y * scale)
    //shape.lineTo(coordinates[3].x * scale, coordinates[3].y * scale)

    
    for (let i = 1; i < length; i++) {
        shape.lineTo(coordinates[i].x * scale, coordinates[i].y * scale)
    }

    shape.lineTo(coordinates[0].x * scale, coordinates[0].y * scale)
    */

    console.log(coordinates)
    //console.log(shape)

    
    shape.moveTo(0, 5)
    shape.lineTo(-5, -5)
    shape.lineTo(5, -5)
    shape.lineTo(0, 0)
    shape.lineTo(0, 5)
    

    return (
        <mesh >
            <meshBasicMaterial color='red' side={THREE.DoubleSide} />
            <shapeGeometry args={[shape]} />
        </mesh>
    )
}