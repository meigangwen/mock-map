import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Sunlight() {
  const sunlightRef = useRef();
  const { camera } = useThree();
  /*
  useEffect(() => {
    if (sunlightRef.current) {
      console.log(camera.position);
    }
  }, [camera]);
  */
  return (
    <directionalLight
      visible
      ref={sunlightRef}
      position={[150, 750, 150]}
      intensity={1.0}
      castShadow
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-camera-near={1}
      shadow-camera-far={1500}
      shadow-camera-left={-2000}
      shadow-camera-right={2000}
      shadow-camera-top={2000}
      shadow-camera-bottom={-2000}
    />
  );
}
