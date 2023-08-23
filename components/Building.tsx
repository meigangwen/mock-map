import * as THREE from 'three'

export default function Building( { coordinates } ) {

    const shape = new THREE.Shape()
    const length = coordinates.length
    const scale = 1

    // move to the first point
    shape.moveTo(coordinates[0].x * scale, coordinates[0].y * scale)

    for (let i = 1; i < length; i++) {
        shape.lineTo(coordinates[i].x * scale, coordinates[i].y * scale)
    }
    shape.lineTo(coordinates[0].x * scale, coordinates[0].y * scale)

    //console.log(coordinates)
    //console.log(shape)

    return (
        <mesh >
            <meshBasicMaterial color='red' side={THREE.DoubleSide} />
            <shapeGeometry args={[shape]} />
        </mesh>
    )
}