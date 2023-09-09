import { useControls } from 'leva'

export default function Floor({...props}){
    //declare the UI parameters
    const { visible, color } = useControls("Floor", {
        visible: true,
        color: {value:"#fff5b3"}
    })

    return (
        <mesh 
            visible={visible}
            receiveShadow
            renderOrder={0}
            {...props}
            >
            <planeGeometry args={[5000,5000]}/>
            <meshStandardMaterial color={color} depthTest={false} />
        </mesh>
    )
}