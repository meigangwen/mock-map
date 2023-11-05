import * as THREE from "three";

export default function ShapeOutline01({ ...props }) {
  let shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, 10);
  shape.lineTo(10, 10);
  shape.lineTo(10, 0);
  shape.lineTo(0, 0);

  const points = shape.getPoints();
  const outline = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={outline}>
      <lineBasicMaterial color="red" linewidth={1} />
    </line>
  );
}
