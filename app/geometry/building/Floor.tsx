
export default function Floor(){
    
    return (
        <mesh 
            receiveShadow
            renderOrder={0}
        >
            <planeGeometry args={[100, 100]}/>
            <meshStandardMaterial 
                color='white' 
                depthTest={false} />
        </mesh>
    )
}