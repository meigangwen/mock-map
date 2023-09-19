export default function Sphere(){
    
    return (
        <mesh 
            castShadow 
            position={[-20.0,-20.0,10.0]}
        >
                <meshStandardMaterial
                    color='red' 
                />
                <sphereGeometry args={[5.0]} />
        </mesh>
    )
}