import { useState, useEffect } from 'react'
import Landcell from './Landcell'
import { useControls } from 'leva'

export default function Landcover({landcoverLayer}) {

    const [landcoverList, setLandcoverList] = useState([])

    const { visible } = useControls("Landcover", {
        visible: true,
    })

    useEffect(() => {
        let landcoverList:any[] = []
        for (let i=0; i<landcoverLayer.length; i++){
            landcoverList.push(landcoverLayer.feature(i))
        }
        setLandcoverList(landcoverList)
    }, [])

    return (
        <group visible={visible} >
            {
                landcoverList.map((landData, index) => {
                    return <Landcell 
                                key={index} 
                                landData = { landData }
                            />
                })
            }
        </group>
    )
      
}



