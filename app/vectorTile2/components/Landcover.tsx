import * as THREE from 'three'
import { useState, useEffect } from 'react'
import { useControls } from 'leva'
import { ringToShape, ringToHole, signedArea } from '../functions/Polygon'

export default function Landcover({landcoverLayer}) {

    //const [landcoverList, setLandcoverList] = useState([])
    const [shapes, setShapes] = useState()

    const { visible } = useControls("Landcover", {
        visible: true,
    })

    useEffect(() => {

        for (let i=0; i<landcoverLayer.length; i++){
            // looping through the features

            //landcoverList.push(landcoverLayer.feature(i))
            //console.log(landcoverLayer.feature(i).properties.class)
        }
        
    }, [])

    return (
        <group visible={visible} >
        </group>
    )
      
}



