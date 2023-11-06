import * as THREE from "three";
import { featureScale } from "../constants/Scale";

//try to refractor this function later
function ringToShape(ring) {
  // set the shape to either shape or path depends on if it is a hole
  const shape = new THREE.Shape();
  shape.moveTo(ring[0].x * featureScale, -ring[0].y * featureScale);
  for (let j = 1; j < ring.length; j++) {
    shape.lineTo(ring[j].x * featureScale, -ring[j].y * featureScale);
  }
  return shape;
}

function ringToHole(ring) {
  // set the shape to either shape or path depends on if it is a hole
  const hole = new THREE.Path();
  hole.moveTo(ring[0].x * featureScale, -ring[0].y * featureScale);
  for (let j = 1; j < ring.length; j++) {
    hole.lineTo(ring[j].x * featureScale, -ring[j].y * featureScale);
  }
  return hole;
}

function signedArea(ring) {
  var sum = 0;
  for (var i = 0, len = ring.length, j = len - 1, p1, p2; i < len; j = i++) {
    p1 = ring[i];
    p2 = ring[j];
    sum += (p2.x - p1.x) * (p1.y + p2.y);
  }
  return sum;
}
export { ringToShape, ringToHole, signedArea };
