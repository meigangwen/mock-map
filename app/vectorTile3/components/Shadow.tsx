import { useControls } from "leva";

// import constants
import { featureScale, extent } from "../constants/Scale";

export default function Shadow({ ...props }) {
  const { opacity, visible } = useControls("Shadow", {
    visible: true,
    opacity: { value: 0.4, min: 0.0, max: 1.0, step: 0.01 },
  });
  const scale = 1.03;

  return (
    <mesh visible={visible} receiveShadow renderOrder={8} {...props}>
      <planeGeometry
        args={[featureScale * extent * scale, featureScale * extent * scale]}
      />
      <shadowMaterial opacity={opacity} />
    </mesh>
  );
  // why is a tile as big as 4225
}
