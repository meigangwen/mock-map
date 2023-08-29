import * as THREE from 'three'
import { useState, useEffect } from 'react'
import gsap from 'gsap'
//import { useControls } from 'leva'

export default function Landcell( { landData, popUp } ) {

    //declare the state hooks
    const [hovered, setHovered] = useState(false)
    const [shape,setShape] = useState(new THREE.Shape())
    const [height, setHeight] = useState(0)
    const [renderOrder, setRenderOrder] = useState(2)
    const [color, setColor] = useState(new THREE.Color("#909090"))
    //const [extrudeSettings,setExtrudeSettings] = useState({})
    
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    //declare the UI parameters
    
    useEffect(() => {
         // get the land data
         const coordinates = landData.geometry.coordinates[0]
         const length = coordinates.length
         
         // get the land properties
         const { name, landuse, leisure, amenity, barrier } = landData.properties
         
         let content = ("<p> Landuse: " + landuse + "</p>")
         content += ("<p> Leisure: " + leisure + "</p>")
         content += ("<p> Amenity: " + amenity + "</p>")
         content += ("<p> Barrier: " + barrier + "</p>")
         //content += ("<p> Name: " + name + "</p>")
         //content += ("<p> Amenity: " + amenity + "</p>")
 
        
        const shape = new THREE.Shape()
        // move to the first point
         shape.moveTo(coordinates[0].x, coordinates[0].y) 
         for (let i = 1; i < length; i++) {
             shape.lineTo(coordinates[i].x, coordinates[i].y)
         }
         shape.lineTo(coordinates[0].x, coordinates[0].y)

        /*
        // extrudeSettings
        const extrudeSettings = {
            steps: 1,
            depth: height,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        }
        */
        if (leisure === 'park') {
            setColor(new THREE.Color("#00ff00"))
            setHeight(0.1)
        } else {
            if (leisure === 'swimming_pool') {
                setColor(new THREE.Color("#1eb4ff"))
                setHeight(0.1)
                setRenderOrder(3)
            }
            if (leisure === 'sports_centre') {
                setColor(new THREE.Color('#00ff00'))
            }
            if (leisure === 'pitch') {
                setColor(new THREE.Color('#00ff00'))
                setHeight(0.1)
                setRenderOrder(3)
            }
        }

         // maybe we need to useMemo to not let these shapes keep on redrawing 
         setShape(shape)
         //setExtrudeSettings(extrudeSettings)
         setTitle(name)
         setContent(content)
    },[])
    
    return (
        <mesh
            position = {[0,0,height]}
            renderOrder={renderOrder}
            receiveShadow
            onPointerOver={(e) => {
                setHovered(true)
                e.stopPropagation()

                gsap.set(popUp, {
                    display: 'block'
                })
                // set the content of the popUp
                popUp.querySelector("#popUp_title").innerHTML = 'Land: ' + title
                popUp.querySelector("#popUp_content").innerHTML = content
            }} 
            onPointerOut={() => {
                setHovered(false)  
                gsap.set(popUp, {
                display: 'none'
            })}} >
            <meshStandardMaterial 
                color={hovered? 'red':color} 
                side={THREE.FrontSide} 
                depthTest={false} />
            
            <shapeGeometry args={[shape]} />
        </mesh>
    )
}