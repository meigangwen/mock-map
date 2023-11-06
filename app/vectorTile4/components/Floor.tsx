import { useControls } from "leva";

// import constants
import { featureScale, extent } from "../constants/Scale";

export default function Floor({ ...props }) {
  //declare the UI parameters
  const { visible, color } = useControls("Floor", {
    visible: true,
    color: { value: "#a6a6a6" },
  });
  const scale = 1.03;

  return (
    <mesh visible={visible} receiveShadow renderOrder={0} {...props}>
      <planeGeometry
        args={[featureScale * extent * scale, featureScale * extent * scale]}
      />
      <meshStandardMaterial
        color={color}
        depthTest={false}
        envMapIntensity={0.2}
      />
    </mesh>
  );
  // why is a tile as big as 4225
}
