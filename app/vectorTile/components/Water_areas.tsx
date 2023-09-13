import { useState, useEffect } from 'react'
import Water_area from './Water_area'
//import { useControls } from 'leva'

export default function Water_areas({waterLayer}) {

    const [waterList, setWaterList] = useState([])

    useEffect(() => {
        let waterList:any[] = []
        for (let i=0; i<waterLayer.length; i++){
            waterList.push(waterLayer.feature(i))
        }
        setWaterList(waterList)
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



