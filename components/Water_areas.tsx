import { useState, useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import Water_area from '@/components/Water_area'

export default function Water_areas({url, scale, origin}) {

    const [waterAreasData, setWaterAreasData] = useState([])

    useEffect(() => {
        fetch(url)                  // loading geo json file 
        .then(function(response) {
            // load the file into a json string
            return response.json()
        })
        .then(function(data) {
            // load the json string into an object
            let waterList:any[] = []
            data.features.forEach(function(feature:any) {
                
                let water = feature

                water.geometry.coordinates[0] = feature.geometry.coordinates[0].map((lonlat) => {
                    var coordinate = maplibregl.MercatorCoordinate.fromLngLat( lonlat , 0 )
                    // convert the coordinates to world scale 
                    coordinate.x = coordinate.x * scale - origin[0]
                    coordinate.y = coordinate.y * scale - origin[1]
                    return coordinate
                })

                waterList.push(water)
            })
           
            setWaterAreasData(waterList)
            //console.log(buildingList)        
        })
        .catch(error => {
            console.log(error)
        }) 
    }, [])

    return (
        <group>
            {
                waterAreasData.map((waterData, index) => {
                    return <Water_area 
                                key={index} 
                                waterData = { waterData }
                            />
                })
            }
        </group>
    )
      
}



