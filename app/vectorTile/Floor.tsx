import { useControls } from 'leva'

// import constants
import {scale, extent} from './Scale'

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
            <planeGeometry args={[4225*scale, 4225*scale]}/>
            <meshStandardMaterial color={color} depthTest={false} />
        </mesh>
    )
    // why is a tile as big as 4225
}