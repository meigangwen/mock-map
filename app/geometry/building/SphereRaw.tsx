import * as THREE from 'three'
import vertexShader from './shaders/sphereRaw_vertex.glsl'
import fragmentShader from './shaders/sphereRaw_fragment.glsl'

export default function SphereRaw(){
    
    return (
        <mesh 
            castShadow 
            position={[-20.0,-60.0,10.0]}
        >
                <rawShaderMaterial 
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                /> 
                <sphereGeometry args={[5.0]} />
        </mesh>
    )
}