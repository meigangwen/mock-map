import { useState, useEffect,useRef } from 'react'
//import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import vertexShader from './shaders/standard_vertex.glsl'
import fragmentShader from './shaders/standard_fragment.glsl'

export default function SphereStandard(){
    //const matRef = useRef()
   
    return (
        <mesh 
            castShadow 
            position={[-20.0,-60.0,10.0]}
        >
                <shaderMaterial
                    ref = {matRef} 
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}

                    side={THREE.FrontSide}

                    uniforms={THREE.UniformsUtils.merge( [

                        THREE.ShaderLib.standard['uniforms'],   // this is god damn important to have the bracket there, otherwise error
                        { 
                            diffuse:{value: new THREE.Color( 0xff0000 )},
                            emissive:{value: new THREE.Color( 0x000000 )},
                            //envMap:{value: envMap}
                            //reflectivity: { value: 0.6 },
                        }
                        
                        //emissive:{value: new THREE.Color( 0x000000 )},
                        //opacity: { value: 1.0 },
                        //ambientLightColor: { value: new THREE.Color( 0xffffff ) },
                        //receiveShadow: {value: true }
                    
                    ])}
                   
                    lights={true}
                    
                    

                /> 
                <sphereGeometry args={[5.0]} />
        </mesh>
    )
}