
export default function Floor(){
    
    return (
        <mesh 
            receiveShadow
        >
            <planeGeometry args={[200, 200]}/>
            <meshStandardMaterial 
                color='white' 
             />
        </mesh>
    )
}