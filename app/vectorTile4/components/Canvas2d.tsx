import { useControls } from "leva";
import * as THREE from "three";
import {
  VectorTile,
  VectorTileLayer,
  VectorTileFeature,
} from "@mapbox/vector-tile";

// import constants
import { featureScale, extent } from "../constants/Scale";

// import classes
import { Point } from "../js/primitives/point.js";
import { Polygon } from "../js/primitives/polygon.js";

// this layer is rendered using the html canvas 2d drawing system
// currently includes the following features
// roads
// landcover
const Canvas2d: React.FC<{ tile: VectorTile }> = ({ tile, ...props }) => {
  /*
  if (tile) {
    console.log(tile);
  }
  */

  //export default function Canvas2d({ ...props }) {
  //declare the UI parameters
  const { visible, color } = useControls("Canvas2d", {
    visible: true,
    color: { value: "#a6a6a6" },
  });
  const scale = 1.03;

  // dynamically create an html canvas
  let myCanvas = document.createElement("canvas");
  myCanvas.id = "myCanvas";
  myCanvas.width = extent;
  myCanvas.height = extent;
  const ctx = myCanvas.getContext("2d");

  // draw a background color
  ctx.fillStyle = "#2a5";
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

  // try offset by half a pixel
  //ctx.translate(0.5, 0.5);

  // construct 4 points
  const p1 = new Point(200, 200);
  const p2 = new Point(500, 200);
  const p3 = new Point(400, 400);
  const p4 = new Point(100, 300);
  const polygon = new Polygon([p1, p2, p3, p4]);
  polygon.draw(ctx);
  //p1.draw(ctx);
  //p2.draw(ctx);
  //p3.draw(ctx);
  //p4.draw(ctx);

  // create a canvas texture from myCanvas
  let texture = new THREE.CanvasTexture(myCanvas);
  //texture.magFilter = THREE.LinearFilter; // For magnification
  //texture.minFilter = THREE.LinearMipmapLinearFilter;

  return (
    <mesh visible={visible} receiveShadow renderOrder={1} {...props}>
      <planeGeometry
        args={[featureScale * extent * scale, featureScale * extent * scale]}
      />
      <meshBasicMaterial
        color={color}
        depthTest={false}
        //envMapIntensity={0.2}
        map={texture}
        //making this layer transparent would mess up the depth sorting
        //transparent
      />
    </mesh>
  );
  // why is a tile as big as 4225
};

export default Canvas2d;
