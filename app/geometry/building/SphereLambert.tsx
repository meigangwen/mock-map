import { useState, useEffect,useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import vertexShader from './shaders/lambert_vertex.glsl'
import fragmentShader from './shaders/lambert_fragment.glsl'

export default function SphereLambert(){
    
    //const [directionalLight, setDirectionalLight] = useState()
    const matRef = useRef()
    //const state = useThree()

    useEffect(() => {
        //const light = new THREE.DirectionalLight(0xffffff, 3.0)
        //light.position.set(10,5,30)
        //setDirectionalLight(light)
        console.log(matRef.current.uniforms)
        /*
        const uniform = THREE.ShaderLib.lambert.uniforms
        console.log(uniform)
        const shader = THREE.ShaderLib.lambert
        const uniform2 = THREE.UniformsUtils.clone(shader.uniforms)
        console.log(uniform2)*/
        //console.log(state.gl)
        
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

                    uniforms={THREE.UniformsUtils.merge( [

                        THREE.UniformsLib['lights'],   // this is god damn important to have the bracket there, otherwise error
                        { 
                            diffuse:{value: new THREE.Color( 0xff0000 )},
                            emissive:{value: new THREE.Color( 0x000000 )}
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