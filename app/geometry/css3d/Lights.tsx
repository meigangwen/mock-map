import * as THREE from "three";
import { useRef } from "react";
import { useHelper } from "@react-three/drei";

export default function Lights() {
  const dirLight = useRef();
  useHelper(dirLight, THREE.DirectionalLightHelper, 1);

  return (
    <group>
      <directionalLight
        ref={dirLight}
        visible
        position={[10, 5, 30]}
        intensity={3.0}
        castShadow={true}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <ambientLight visible intensity={0.5} />
    </group>
  );
}
