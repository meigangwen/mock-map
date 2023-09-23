//import { useThree } from '@react-three/fiber'
import * as THREE from "three"
import { useState, useEffect, useRef } from 'react'
import vertexShader from './shaders/custom/lambert_vertex.glsl'
import fragmentShader from './shaders/custom/lambert_fragment.glsl'

export default function FloorCustom(){
    
    return (
        <mesh 
            receiveShadow
        >
            <planeGeometry args={[200, 200]}/>
            <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    side={THREE.FrontSide}

                    uniforms={THREE.UniformsUtils.merge( [

                        THREE.UniformsLib['lights'],   // this is god damn important to have the bracket there, otherwise error
                        THREE.UniformsLib['fog'],
                        { 
                            diffuse:{value: new THREE.Color( 0xffffff )},
                            emissive:{value: new THREE.Color( 0x000000 )}
                        }
                        
                        //emissive:{value: new THREE.Color( 0x000000 )},
                        //opacity: { value: 1.0 },
                        //ambientLightColor: { value: new THREE.Color( 0xffffff ) },
                        //receiveShadow: {value: true }
                    
                    ])}

                    lights={true}
                    fog={true}
                    
                /> 

        </mesh>
    )
}