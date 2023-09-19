import * as THREE from 'three'
import vertexShader from './shaders/lambert_vertex.glsl'
import fragmentShader from './shaders/lambert_fragment.glsl'

export default function SphereCustom(){
    
    return (
        <mesh 
            castShadow 
            position={[-20.0,-40.0,10.0]}
        >
                <shaderMaterial 
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    side={THREE.FrontSide}
                    //uniforms = {THREE.ShaderLib.lambert.uniforms}

                    uniforms={{ 
                                diffuse:{value: new THREE.Color( 0xff0000 )},
                                emissive:{value: new THREE.Color( 0x000000 )},
                                opacity: { value: 1.0 },
                                ambientLightColor: { value: new THREE.Color( 0xffffff ) },
                                receiveShadow: {value: true },
                                directionalLights: {value: new THREE.DirectionalLight(0xffffff, 1.0)}
                             }} 
                /> 
                <sphereGeometry args={[5.0]} />
        </mesh>
    )
}