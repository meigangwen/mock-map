import { useState, useEffect } from 'react'
//import Building from './Building'
import { useControls } from 'leva'

export default function Roads({ roadLayer }) {

    const [roadList, setRoadList] = useState([])
    
    //declare the UI parameters
     const { visible } = useControls("Roads", {
        visible: true,
    })

    useEffect(() => {
        let roadList:any[] = []
        for (let i=0; i<roadLayer.length; i++){
            //console.log(buildingLayer.feature(i).loadGeometry())
            roadList.push(roadLayer.feature(i))
        }
        setRoadList(roadList)
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