//import { useThree } from '@react-three/fiber'
import { useState, useEffect, useRef } from "react";

export default function Floor() {
  return (
    <mesh receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}
