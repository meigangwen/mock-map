import { useState, useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import Road from '@/components/Road'
import { useControls } from 'leva'

export default function Roads({url, scale, origin}) {

    const [roadsData, setRoadsData] = useState([])

    const { visible } = useControls("Road", {
        visible: true
    })

    useEffect(() => {
        fetch(url)                  // loading geo json file 
        .then(function(response) {
            // load the file into a json string
            return response.json()
        })
        .then(function(data) {
            // load the json string into an object
            let roadList:any[] = []
            data.features.forEach(function(feature:any) {
                
                let road = feature

                road.geometry.coordinates = feature.geometry.coordinates.map((lonlat) => {
                    var coordinate = maplibregl.MercatorCoordinate.fromLngLat( lonlat , 0 )
                    // convert the coordinates to world scale 
                    coordinate.x = coordinate.x * scale - origin[0]
                    coordinate.y = coordinate.y * scale - origin[1]
                    coordinate.y *= -1
                    return coordinate
                })
                
                roadList.push(road)
            })
           
            setRoadsData(roadList)
            //console.log(roadList)        
        })
        .catch(error => {
            console.log(error)
        }) 
    }, [])

    return (
        <group 
            visible={visible}
            renderOrder={5}    
        >
            {
                roadsData.map((roadData, index) => {
                    return <Road 
                                key={index} 
                                roadData = { roadData }
                            />
                })
            }
        </group>
    )
      
}



