import * as THREE from "three";
import { Point } from "./js/primitives/point.js";
import { Segment } from "./js/primitives/segment.js";
import { Graph } from "./js/math/graph.js";

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

  // try offset by half a pixel
  ctx.translate(0.5, 0.5);

  // construct 4 points
  const p1 = new Point(200, 200);
  const p2 = new Point(500, 200);
  const p3 = new Point(400, 400);
  const p4 = new Point(100, 300);

  const s1 = new Segment(p1, p2);
  const s2 = new Segment(p1, p3);
  const s3 = new Segment(p1, p4);
  const s4 = new Segment(p2, p3);

  const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4]);
  graph.draw(ctx);

  // create a canvas texture from myCanvas
  let texture = new THREE.CanvasTexture(myCanvas);

  return (
    <mesh>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial map={texture} transparent={true} />
    </mesh>
  );
}
