
import { useRef, useLayoutEffect, useEffect, useMemo } from 'react'

export default function Buildings({url}) {
    function fetchJSON(url) {
        return fetch(url)
          .then(function(response) {
            return response.json();
          })
    }

    /*
    useEffect(() => {
        var geoData = fetchJSON(url)
            .then(function(data) { 

            data.features.forEach(function(feature) {
                console.log(feature)
                var symbol = feature.properties['icon']
                console.log(symbol)
            })
        })
    },[])
    */

    const buildingsData = useMemo(() => {


    }, [])

    return (
        <>
        </>
    )
}

