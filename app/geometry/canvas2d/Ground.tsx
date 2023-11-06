import * as THREE from "three";
import { Point } from "./js/primitives/point.js";

export default function Ground() {
  // dynamically create an html canvas
  let myCanvas = document.createElement("canvas");
  myCanvas.id = "myCanvas";
  myCanvas.width = 600;
  myCanvas.height = 600;
  const ctx = myCanvas.getContext("2d");

  // draw a background color
  ctx.fillStyle = "#2a5";
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

  // construct 4 points
  const p1 = new Point(200, 200);
  const p2 = new Point(500, 200);
  const p3 = new Point(400, 400);
  const p4 = new Point(100, 300);
  p1.draw(ctx);
  p2.draw(ctx);
  p3.draw(ctx);
  p4.draw(ctx);

  // create a canvas texture from myCanvas
  let texture = new THREE.CanvasTexture(myCanvas);

  return (
    <mesh>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial map={texture} transparent={true} />
    </mesh>
  );
}
