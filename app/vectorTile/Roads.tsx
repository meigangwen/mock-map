import { useState, useEffect } from 'react'
import Road from './Road'
import { useControls } from 'leva'

export default function Roads({ roadLayer }) {

    const [roadList, setRoadList] = useState([])

    //declare the UI parameters
    const { service, path, minor, trunk, primary, secondary,motorway, transit, bridge,tertiary } = useControls("Roads", {
        service: true,    // carpark and HDB inner roads
        path: false,       // foot path, shown as light dotted lines in maplibre
        minor: true,      // Narrow roads, white color in maplibre
        trunk: true,      // Main roads, the yellow color one in maplibre
        primary: true,    // Main roads, the yellow color one in maplibre
        secondary: true,  // Smaller roads, white color one in maplibre
        motorway: true,  //Expressway, the orange color one in maplibre
        transit: false,   //MRT and LRT
        bridge: false,
        tertiary: false
    })
      
    useEffect(() => {
        let roadList:any[] = []
        for (let i=0; i<roadLayer.length; i++){
            roadList.push(roadLayer.feature(i))
        }
        // filter the road list based on varaibles
        if (!service){
            roadList = roadList.filter((road) => {return road.properties.class != 'service'} )
        }
        if (!path){
            roadList = roadList.filter((road) => {return road.properties.class != 'path'} )
        }
        if (!minor){
            roadList = roadList.filter((road) => {return road.properties.class != 'minor'} )
        }
        if (!trunk){
            roadList = roadList.filter((road) => {return road.properties.class != 'trunk'} )
        }
        if (!primary){
            roadList = roadList.filter((road) => {return road.properties.class != 'primary'} )
        }
        if (!secondary){
            roadList = roadList.filter((road) => {return road.properties.class != 'secondary'} )
        }
        if (!motorway){
            roadList = roadList.filter((road) => {return road.properties.class != 'motorway'} )
        }
        if (!transit){
            roadList = roadList.filter((road) => {return road.properties.class != 'transit'} )
        }
        if (!bridge){
            roadList = roadList.filter((road) => {return road.properties.class != 'bridge'} )
        }
        if (!tertiary){
            roadList = roadList.filter((road) => {return road.properties.class != 'tertiary'} )
        }

        setRoadList(roadList)
    },[service,path,minor,trunk,primary,secondary,motorway,transit,bridge,tertiary])
    
    return (
        <group >
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