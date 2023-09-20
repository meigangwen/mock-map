import { useState, useEffect,useRef } from 'react'
import * as THREE from 'three'
import vertexShader from './shaders/lambert_vertex.glsl'
import fragmentShader from './shaders/lambert_fragment.glsl'

export default function SphereCustom(){
    
    const [directionalLight, setDirectionalLight] = useState()
    const matRef = useRef()

    useEffect(() => {
        const light = new THREE.DirectionalLight(0xffffff, 3.0)
        light.position.set(10,5,30)
        setDirectionalLight(light)
        console.log(matRef.current.uniforms)
        /*
        const uniform = THREE.ShaderLib.lambert.uniforms
        console.log(uniform)
        const shader = THREE.ShaderLib.lambert
        const uniform2 = THREE.UniformsUtils.clone(shader.uniforms)
        console.log(uniform2)*/
        //console.log(THREE.UniformsLib.lights)
        
    },[])

    return (
        <mesh 
            castShadow 
            position={[-20.0,-40.0,10.0]}
        >
                <shaderMaterial
                    ref={matRef} 
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    side={THREE.FrontSide}
                    uniforms={{ 
                                diffuse:{value: new THREE.Color( 0xff0000 )},
                                emissive:{value: new THREE.Color( 0x000000 )},
                                opacity: { value: 1.0 },
                                ambientLightColor: { value: new THREE.Color( 0xffffff ) },
                                receiveShadow: {value: true },
                                
                                directionalLight: { 
                                    properties:{
                                        direction: new THREE.Vector3(0,0,1.0), 
                                        color: new THREE.Color( 0xffffff )},
                                    value: new THREE.DirectionalLight(new THREE.Color( 0xffffff ),1.0)                           
                                }
                             }}
                    
                    
                    //lights={true}
                /> 
                <sphereGeometry args={[5.0]} />
        </mesh>
    )
}