import { useState, useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import Landcell from '@/components/Landcell'

export default function Landcover({url, scale, origin}) {

    const [landcoverData, setLandcoverData] = useState([])

    useEffect(() => {
        fetch(url)                  // loading geo json file 
        .then(function(response) {
            // load the file into a json string
            return response.json()
        })
        .then(function(data) {
            // load the json string into an object
            let landList:any[] = []
            data.features.forEach(function(feature:any) {
                
                let land = feature

                land.geometry.coordinates[0] = feature.geometry.coordinates[0].map((lonlat) => {
                    var coordinate = maplibregl.MercatorCoordinate.fromLngLat( lonlat , 0 )
                    // convert the coordinates to world scale 
                    coordinate.x = coordinate.x * scale - origin[0]
                    coordinate.y = coordinate.y * scale - origin[1]
                    return coordinate
                })

                landList.push(land)
            })
           
            setLandcoverData(landList)
            //console.log(buildingList)        
        })
        .catch(error => {
            console.log(error)
        }) 
    }, [])

    return (
        <group>
            {
                landcoverData.map((landData, index) => {
                    return <Landcell 
                                key={index} 
                                landData = { landData }
                            />
                })
            }
        </group>
    )
      
}



