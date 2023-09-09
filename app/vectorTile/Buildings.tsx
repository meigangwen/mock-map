import { useState, useEffect } from 'react'
import Building from './Building'
import { useControls } from 'leva'

export default function Buildings({ buildingLayer }) {

    const [buildingList, setBuildingList] = useState([])
    
    //declare the UI parameters
     const { visible } = useControls("Buildings", {
        visible: true,
    })

    useEffect(() => {
        let buildingList:any[] = []
        for (let i=0; i<buildingLayer.length; i++){
            //console.log(buildingLayer.feature(i).loadGeometry())
            buildingList.push(buildingLayer.feature(i))
        }
        setBuildingList(buildingList)
    },[])
    

    return (
        <group visible={visible} >
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