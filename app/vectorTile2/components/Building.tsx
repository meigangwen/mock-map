import * as React from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { ringToShape, ringToHole, signedArea } from "../functions/Polygon";
import { VectorTileLayer, VectorTileFeature } from "@mapbox/vector-tile";

const Building: React.FC<{ buildingLayer: VectorTileLayer }> = ({
  buildingLayer,
}) => {
  useEffect(() => {
    //console.log(buildingData.id)
    let shapes = [],
      shape;

    for (let i = 0; i < buildingData.loadGeometry().length; i++) {
      const ring = buildingData.loadGeometry()[i];
      const area = signedArea(ring);
      if (area > 0) {
        // this area is a shape
        shape = new THREE.Shape();
        // move to the first point
        shape.moveTo(-ring[0].x * scale, ring[0].y * scale);
        for (let j = 1; j < ring.length; j++) {
          shape.lineTo(-ring[j].x * scale, ring[j].y * scale);
        }
        shapes.push(shape);
      }
      if (area < 0) {
        // this area is a hole, which needs to be attached to the previous shape
        const hole = new THREE.Path();
        hole.moveTo(-ring[0].x * scale, ring[0].y * scale);
        for (let j = 1; j < ring.length; j++) {
          hole.lineTo(-ring[j].x * scale, ring[j].y * scale);
        }
        shape?.holes.push(hole);
        shapes.pop();
        shapes.push(shape);
      }
    }
    setShapes(shapes);

    // calculate the building height
    const depth =
      buildingData.properties.render_height -
      buildingData.properties.render_min_height;
    const height = buildingData.properties.render_min_height;
    setHeight(height);

    // extrudeSettings
    const extrudeSettings = {
      steps: 1,
      depth: depth,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    };
    setExtrudeSettings(extrudeSettings);

    // set the color

    if ("colour" in buildingData.properties) {
      setColor(buildingData.properties.colour);
    }
  }, []);

  return (
    <mesh
      position={[0, 0, height]}
      receiveShadow
      castShadow
      renderOrder={10}
      onPointerOver={(e) => {
        setHovered(true);
        e.stopPropagation();
      }}
      onPointerOut={() => {
        setHovered(false);
      }}
    >
      <meshStandardMaterial color={hovered ? "red" : color} />
      <extrudeGeometry args={[shapes, extrudeSettings]} />
    </mesh>
  );
};

export default Building;
