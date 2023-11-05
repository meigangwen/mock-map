import * as THREE from "three";

export default function Shape01({ ...props }) {
  let shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, 10);
  shape.lineTo(10, 10);
  shape.lineTo(10, 0);
  shape.lineTo(0, 0);

  return (
    <mesh {...props}>
      <meshBasicMaterial color="red" />
      <shapeGeometry args={[shape]} />
    </mesh>
  );
}
