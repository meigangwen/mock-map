export default function Sphere() {
  return (
    <group position={[-20.0, -20.0, 10.0]}>
      <mesh
        castShadow
        //position={[-20.0,-20.0,10.0]}
      >
        <meshStandardMaterial color="red" envMapIntensity={3.0} />
        <sphereGeometry args={[5.0]} />
      </mesh>
      <mesh></mesh>
    </group>
  );
}
