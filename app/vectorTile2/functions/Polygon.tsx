import * as THREE from "three";
import { scale } from "../constants/Scale";

//try to refractor this function later
function ringToShape(ring) {
  // set the shape to either shape or path depends on if it is a hole
  const shape = new THREE.Shape();
  shape.moveTo(-ring[0].x * scale, ring[0].y * scale);
  for (let j = 1; j < ring.length; j++) {
    shape.lineTo(-ring[j].x * scale, ring[j].y * scale);
  }
  return shape;
}

function ringToHole(ring) {
  // set the shape to either shape or path depends on if it is a hole
  const hole = new THREE.Path();
  hole.moveTo(-ring[0].x * scale, ring[0].y * scale);
  for (let j = 1; j < ring.length; j++) {
    hole.lineTo(-ring[j].x * scale, ring[j].y * scale);
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

// classifies an array of rings into polygons with outer rings and holes
function classifyRings(rings) {
  var len = rings.length;

  if (len <= 1) return [rings];

  var polygons = [],
    polygon,
    ccw;

  for (var i = 0; i < len; i++) {
    var area = signedArea(rings[i]);
    if (area === 0) continue;

    if (ccw === undefined) ccw = area < 0;

    if (ccw === area < 0) {
      if (polygon) polygons.push(polygon);
      polygon = [rings[i]];
    } else {
      polygon.push(rings[i]);
    }
  }
  if (polygon) polygons.push(polygon);

  return polygons;
}

export { ringToShape, ringToHole, classifyRings, signedArea };
