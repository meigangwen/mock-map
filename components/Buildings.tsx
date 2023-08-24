import { useState, useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import Building from '@/components/Building'

export default function Buildings({url, scale, origin}) {

    const [buildingsData, setBuildingsData] = useState([])

    useEffect(() => {
        fetch(url)                  // loading geo json file 
        .then(function(response) {
            // load the file into a json string
            return response.json()
        })
        .then(function(data) {
            // load the json string into an object
            let buildingList:any[] = []
            data.features.forEach(function(feature:any) {
                
                let building = feature

                building.geometry.coordinates[0] = feature.geometry.coordinates[0].map((lonlat) => {
                    var coordinate = maplibregl.MercatorCoordinate.fromLngLat( lonlat , 0 )
                    // convert the coordinates to world scale 
                    coordinate.x = coordinate.x * scale - origin[0]
                    coordinate.y = coordinate.y * scale - origin[1]
                    return coordinate
                })

                buildingList.push(building)
            })
           
            setBuildingsData(buildingList)
            //console.log(buildingList)        
        })
        .catch(error => {
            console.log(error)
        }) 
    }, [])

    return (
        <group>
            {
                buildingsData.map((buildingData, index) => {
                    return <Building 
                                key={index} 
                                buildingData = { buildingData }
                            />
                })
            }
        </group>
    )
      
}



