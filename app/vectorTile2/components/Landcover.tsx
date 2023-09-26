import * as THREE from 'three'
import { useState, useEffect } from 'react'
import { useControls } from 'leva'
import { ringToShape, ringToHole, signedArea } from '../functions/Polygon'

export default function Landcover({landcoverLayer}) {

    const [shapes, setShapes] = useState()
    const [hovered, setHovered] = useState()
    //const [height, setHeight] = useState()
    //const [renderOrder, setRenderOrder] = useState()

    const { visible } = useControls("Landcover", {
        visible: true,
    })

    // defines the class name list
    const landClass = ['grass', 'wood', 'sand']

    useEffect(() => {
        
        let shapes,
            shape

        for (let i=0; i<landcoverLayer.length; i++){
            
            // looping through the features
            const geometry = landcoverLayer.feature(i).loadGeometry()
            const landClass = landcoverLayer.feature(i).properties.class


            
            if (geometry.length === 1) {
                // there is no need to check for holes
                const ring = geometry[0]
                shape = ringToShape(ring)
                grassShapes.push(shape)
            }
            
            else {
                // need to run test to check for holes
                for (let i = 0; i < geometry.length; i++){
                    const ring = geometry[i]
                    const area = signedArea(ring)
                    if  (area > 0 ){
                        // this area is a shape
                        shape = ringToShape(ring)
                        grassShapes.push(shape)
                    }
                    if ( area < 0 ){
                        // this area is a hole, which needs to be attached to the previous shape
                        const hole = ringToHole(ring)
                        shape?.holes.push(hole)
                        grassShapes.pop()
                        grassShapes.push(shape)
                    }
                }
            
            }
        }
        setShapes(grassShapes)
    }, [])

    return (
        <group visible={visible} >
            <mesh
                position = {[0,0,0]}
                renderOrder={2}
                receiveShadow
                onPointerOver={(e) => {
                    setHovered(true)
                    e.stopPropagation()
                }} 
                onPointerOut={() => {
                    setHovered(false)  
                }} >
                <meshStandardMaterial 
                    color={hovered? 'red':'#ffffff'} 
                    side={THREE.FrontSide} 
                    depthTest={false} />
                <shapeGeometry args={[shapes]} />
            </mesh>
        </group>
    )
}



