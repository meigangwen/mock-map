
import { useState, useEffect } from 'react'
import Building from '@/components/Building'
import maplibregl from 'maplibre-gl'
import * as THREE from 'three'

//{
//    buildingList.map((building, index) => {
//        return <Building key={index} coordinates={building} />
//    })
//}

export default function Buildings({url, scale, origin}) {

    const [data, setData] = useState([])

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
                // conver the coordinates from lat lon to 3D
                var building = feature.geometry.coordinates[0].map((lonlat) => {
                    return maplibregl.MercatorCoordinate.fromLngLat( lonlat , 0 )
                
                })
                buildingList.push(building)
            })
            //console.log(buildingList)
            //console.log(buildingList.length)

            setData(buildingList)        
        })
        .catch(error => {
            console.log(error)
        }) 
    }, [])

    return (
        <group>
            {
                data.map((building, index) => {
                    return <Building 
                                key={index} 
                                coordinates={building} 
                                scale={scale} 
                                origin={origin} />
                })
            }
        </group>
    )
      
}



