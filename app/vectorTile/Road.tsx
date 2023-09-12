import * as THREE from 'three'
import { useState, useEffect } from 'react'
//import { useControls } from 'leva'

// import constants
import {scale} from './Scale'

export default function Road( { roadData } ) {

    //declare the state hooks
    //const [visible,setVisible] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [color, setColor] = useState(new THREE.Color("#ffffff"))
    const [renderOrder, setRenderOrder] = useState(6)
    const [shape, setShape] = useState(new THREE.Shape())
    //const [geometry,setGeometry] = useState(new THREE.BufferGeometry())
    //const [extrudeSettings,setExtrudeSettings] = useState({})
    
    useEffect(() => {
        const shape = new THREE.Shape()
        let width = 2.0

        if (roadData.type === 2){
        
            const resolution = 1
            const length = roadData.loadGeometry()[0].length
            console.log(roadData.properties)

            
            const curvePoints = roadData.loadGeometry()[0].map((coordinate) => {
                return new THREE.Vector3( -coordinate.x * scale, coordinate.y * scale, 0 )
            })
            //console.log(curvePoints)
            const curve = new THREE.CatmullRomCurve3(curvePoints)
            
            const points = curve.getPoints(length * resolution)

            // create road shape
             // if the road is a line
             switch(roadData.properties.class) {
                case "service":
                width = 4.0
                setColor('#ffffff') 
                setRenderOrder(7)    
                break
                
                case "path":
                width = 2
                setColor('#ffffff') 
                setRenderOrder(7) 
                break
                
                case 'minor': 
                width = 6.0
                setColor('#ffffff') 
                setRenderOrder(7)
                break
                
                case 'trunk':
                width = 12.0
                setColor('#ffff00') 
                setRenderOrder(7)
                break
                
                case 'primary': 
                width = 12.0
                setColor('#ffff00')
                setRenderOrder(7) 
                break
                
                case 'secondary':
                width = 10.0
                setColor('#ffff00')
                setRenderOrder(7)
                break
                
                case 'motorway':
                width = 15.0
                setColor('#fda172')
                setRenderOrder(6)    
                break
                
                case 'transit':
                break
                case 'bridge':
                break
                case 'tertiary':
                break
                default:
                // code block
                // service, path, minor, trunk, primary, secondary,motorway, transit, bridge,tertiary 
            }
            
            //shape.moveTo(points[0].x, points[0].y)
            for (let i = 0; i < points.length - 1; i++) {
                let start = points[i]
                let end = points[i + 1]
            
                let direction = new THREE.Vector3().subVectors(end, start).normalize()
                let perpendicular = new THREE.Vector3(-direction.y, direction.x, 0).multiplyScalar(width * 0.5)
            
                if (i === 0) {
                    shape.moveTo(start.x + perpendicular.x, start.y + perpendicular.y)
                }
            
                shape.lineTo(end.x + perpendicular.x, end.y + perpendicular.y)
            }
            
            for (let i = points.length - 2; i >= 0; i--) {
                let start = points[i + 1]
                let end = points[i]
            
                let direction = new THREE.Vector3().subVectors(end, start).normalize()
                let perpendicular = new THREE.Vector3(-direction.y, direction.x, 0).multiplyScalar(width * 0.5)

                shape.lineTo(start.x + perpendicular.x, start.y + perpendicular.y)

                if(i === 0 ){
                    shape.lineTo(end.x + perpendicular.x, end.y + perpendicular.y)
                }
            }
            //shape.lineTo(points[0].x, points[0].y)

            setShape(shape)
            
       

        } else {
            if (roadData.type === 3){
            // if the road is a polygon
            // not setting the geometry for now
            }
        }

    },[])
    
    return (
        <mesh
            renderOrder={renderOrder}
            receiveShadow
            onPointerOver={(e) => {
                setHovered(true)
                e.stopPropagation()
            }} 
            onPointerOut={() => {
                setHovered(false)  
            }}>
            <meshStandardMaterial 
                color={hovered? 'red':color} 
                side={THREE.FrontSide} 
                depthTest={false}
                />
            <shapeGeometry args={[shape]} />
        </mesh>
    )
}