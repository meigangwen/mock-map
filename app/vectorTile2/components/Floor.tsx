import { useControls } from "leva";

// import constants
import { scale, extent } from "../constants/Scale";

export default function Floor({ ...props }) {
  console.log("Floor");
  //declare the UI parameters
  const { visible, color } = useControls("Floor", {
    visible: true,
    color: { value: "#a6a6a6" },
  });

  return (
    <mesh visible={visible} receiveShadow renderOrder={0} {...props}>
      <planeGeometry args={[4225 * scale, 4225 * scale]} />
      <meshStandardMaterial color={color} depthTest={false} />
    </mesh>
  );
  // why is a tile as big as 4225
}
