import { useState, useEffect } from 'react'
import Road from './Road'
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
            roadList.push(roadLayer.feature(i))
        }
        setRoadList(roadList)
    },[])
    
    return (
        <group visible={visible} >
            {
                roadList.map((roadData, index) => {
                return <Road 
                            key={index} 
                            roadData = { roadData }
                        />
                })
            }
        </group>
    )
}