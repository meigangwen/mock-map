
import { useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import Building from '@/components/Building'
import maplibregl from 'maplibre-gl'

export default function Buildings({url}) {

    /*
    function fetchJSON(url) {
        return fetch(url)
          .then(function(response) {
            return response.json()
          })
    }*/
   
    let buildingList:any[] = []
    //let buildingData
    useEffect(() => {
        const buildingJson = fetch(url)
                            .then(function(response) {
                                return response.json()
                            })
        const buildingData = buildingJson.then((data) => {return data})                   
        console.log(buildingData)

    },[])

    //const buildingData = await fetchJSON(url)
    //console.log(buildingData)

    /*
    var buildingsData = await fetchJSON(url)
            .then(function(data) { 
                data.features.forEach(function(feature:any) {
                    // conver the coordinates from lat lon to 3D
                    var building = feature.geometry.coordinates[0].map((lonlat) => {
                        return maplibregl.MercatorCoordinate.fromLngLat( lonlat , 0 )
                       
                    })
                    buildingList.push(building)
                })
    })
    */

    //console.log(buildingList)
    //console.log(buildingList[0])

    //var buildings = []

    /*
    useEffect(() => {
        var buildingsData = fetchJSON(url)
            .then(function(data) { 
            
            data.features.forEach(function(feature:any) {
                // conver the coordinates from lat lon to 3D
                var building = feature.geometry.coordinates[0].map((lonlat) => {
                    return maplibregl.MercatorCoordinate.fromLngLat( lonlat , 0 )

                })
                buildings.push(building)
            })
        })
        console.log(buildings.length)
        console.log(buildings[0])
    },[])
    */

    // buildings.forEach((building) => {
    //     console.log(building)
    // })

    //console.log(buildings)
    // replace the above code using useMemo()
    // replace the above code using the filtering functions of javascript arrays, such as map, flatMap

    // {
                //buildingList.map((building, index) => (
                //    <Building key={index} coordinates={building} />
                //)
           // )}

    return (
        <group>
        </group>
    )
}

