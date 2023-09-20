import * as THREE from 'three'
import vertexShader from './shaders/standard_vertex.glsl'
import fragmentShader from './shaders/standard_fragment.glsl'

export default function SphereStandard(){
    
    return (
        <mesh 
            castShadow 
            position={[-20.0,-60.0,10.0]}
        >
                <shaderMaterial 
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={{ 
                        diffuse:{value: new THREE.Color( 0xff0000 )},
                        emissive:{value: new THREE.Color( 0x000000 )},
                        opacity: { value: 1.0 },
                        ambientLightColor: { value: new THREE.Color( 0xffffff ) },
                        receiveShadow: {value: true },
                    }}
                /> 
                <sphereGeometry args={[5.0]} />
        </mesh>
    )
}