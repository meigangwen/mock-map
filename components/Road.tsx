import * as THREE from 'three'
import { useState, useEffect } from 'react'
//import { useControls } from 'leva'

export default function Road( { roadData } ) {

    //declare the state hooks
    //const [hovered, setHovered] = useState(false)
    //const [points,setPoints] = useState([])
    const [geometry,setGeometry] = useState(new THREE.BufferGeometry())

    //const [extrudeSettings,setExtrudeSettings] = useState({})

    //declare the UI parameters

    // const { wireframe, color } = useControls("Buildings", {
    //     wireframe: false,
    //     color: {value:"#ffffff"}
    // })

    useEffect(() => {
         // get the road points
        const coordinates = roadData.geometry.coordinates
        const length = coordinates.length
        const resolution = 3
         // get the road properties
         

         // construct the curve object
        const curvePoints = coordinates.map((coordinate) => {
                return new THREE.Vector3( coordinate.x, coordinate.y, 0.5 )
        })
        
        const curve = new THREE.CatmullRomCurve3(curvePoints)
        const points = curve.getPoints(length * resolution)
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        setGeometry(geometry)
        //setPoints(points)
         // maybe we need to useMemo to not let these shapes keep on redrawing 
         //set(shape)
         //setExtrudeSettings(extrudeSettings)
    },[])
    
    return (
        <line geometry={geometry}>
            <lineBasicMaterial attach="material" color="white" />
        </line>
    )
}