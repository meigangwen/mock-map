import { useState, useEffect } from 'react'
import Building from './Building'

export default function Buildings({ buildingLayer }) {

    const [buildingList, setBuildingList] = useState([])

    useEffect(() => {
        let buildingList:any[] = []
        for (let i=0; i<buildingLayer.length; i++){
            //console.log(buildingLayer.feature(i).loadGeometry())
            buildingList.push(buildingLayer.feature(i).loadGeometry())
        }
        setBuildingList(buildingList)
    },[])
    

    return (
        <group>
            {
                buildingList.map((buildingData, index) => {
                return <Building 
                            key={index} 
                            buildingData = { buildingData }
                        />
                })
            }
        </group>
    )
}