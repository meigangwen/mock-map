import { useControls } from "leva";

// import constants
import { featureScale, extent } from "../constants/Scale";

export default function Background({ ...props }) {
  //declare the UI parameters
  const { visible, color } = useControls("Background", {
    visible: true,
    color: { value: "#767676" },
  });

  // this scale is set to cover the out of boundary data of vector tile
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
  // the tile size in pixel is 4096, with margin the size is 4225
}
