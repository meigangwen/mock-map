import { useState, useEffect } from 'react'
//import Water_area from './Water_area'
import { useControls } from 'leva'

import {scale} from '../constants/Scale'
import {signedArea} from '../functions/Polygon'

export default function Water({waterLayer}) {

    //const [waterList, setWaterList] = useState([])
    const [shapes, setShapes] = useState([])

    useEffect(() => {
        //let waterList:any[] = []
        for (let i=0; i<waterLayer.length; i++){
            //waterList.push(waterLayer.feature(i))
            //process each water area
            
        }
        //setWaterList(waterList)
    }, [])

    return (
        <group>
            {
                waterList.map((waterData, index) => {
                    return <Water_area 
                                key={index} 
                                waterData = { waterData }
                            />
                })
            }
        </group>
    )
      
}



