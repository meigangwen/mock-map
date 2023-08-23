
import { useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import Building from '@/components/Building'
import maplibregl from 'maplibre-gl'

export default function Buildings({url}) {
    function fetchJSON(url) {
        return fetch(url)
          .then(function(response) {
            return response.json();
          })
    }

    var buildings = [] 

    useEffect(() => {
        var buildingsData = fetchJSON(url)
            .then(function(data) { 

            data.features.forEach(function(feature:any) {

                buildings.push(feature.geometry.coordinates)
            })
        })
    },[])

    //console.log(buildings)
    // replace the above code using useMemo()
    // replace the above code using the filtering functions of javascript arrays, such as map, flatMap

    return (
        <group>
            {
                buildings.map((building, index) => (
                    <Building key={index} coordinates={building} />
                ))}
        </group>
    )
}

