import { useControls } from "leva";
import * as THREE from "three";
import {
  VectorTile,
  VectorTileLayer,
  VectorTileFeature,
} from "@mapbox/vector-tile";
import { ringToShape, ringToHole, signedArea } from "../functions/Polygon";

// import constants
import { featureScale, extent } from "../constants/Scale";

// import classes
import { Point } from "../js/primitives/point.js";
import { Segment } from "../js/primitives/segment.js";
import { Polygon } from "../js/primitives/polygon.js";
import { Graph } from "../js/math/graph.js";

// this layer is rendered using the html canvas 2d drawing system
// currently includes the following features
// background
// landcover
// water
// roads

const Canvas2d: React.FC<{ tile: VectorTile }> = ({ tile, ...props }) => {
  //declare the UI parameters
  const { visible } = useControls("Canvas2d", {
    visible: true,
  });
  const scale = 1;

  // dynamically create an html canvas
  let myCanvas = document.createElement("canvas");
  myCanvas.id = "myCanvas";
  myCanvas.width = extent;
  myCanvas.height = extent;
  const ctx = myCanvas.getContext("2d");

  // draw a background color
  ctx.fillStyle = "#a6a6a6";
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

  // try offset by half a pixel
  //ctx.translate(0.5, 0.5);

  // draw the landcover layer
  const landcoverDict = {
    grass: "#00ff00",
    wood: "#009900",
    sand: "#FFFF00",
  };
  const landcoverLayer = tile.layers.landcover;
  // to draw landcover better, we could separate the class, and draw by layer
  for (let i = 0; i < landcoverLayer.length; i++) {
    const geometry = landcoverLayer.feature(i).loadGeometry();
    const landclass = landcoverLayer.feature(i).properties.class;
    const color = landcoverDict[String(landclass)];
    if (geometry.length === 1) {
      const polygon = new Polygon(geometry[0]);
      polygon.draw(ctx, { fill: color });
    } else {
      // need to run test to check for holes
      for (let i = 0; i < geometry.length; i++) {
        const ring = geometry[i];
        const area = signedArea(ring);
        if (area > 0) {
          const polygon = new Polygon(geometry[i]);
          polygon.draw(ctx, { fill: color });
        }
        if (area < 0) {
          const hole = new Polygon(geometry[i]);
          hole.draw(ctx, { fill: "#a6a6a6" });
        }
      }
    }
  }

  // draw the water layer
  const waterLayer = tile.layers.water;
  for (let i = 0; i < waterLayer.length; i++) {
    const geometry = waterLayer.feature(i).loadGeometry();
    if (geometry.length === 1) {
      const polygon = new Polygon(geometry[0]);
      polygon.draw(ctx, { fill: "#1eb4ff" });
      //console.log(geometry[0]);
    } else {
      // need to run test to check for holes
      for (let i = 0; i < geometry.length; i++) {
        const ring = geometry[i];
        const area = signedArea(ring);
        if (area > 0) {
          const polygon = new Polygon(geometry[i]);
          polygon.draw(ctx, { fill: "#1eb4ff" });
        }
        if (area < 0) {
          const hole = new Polygon(geometry[i]);
          hole.draw(ctx, { fill: "#a6a6a6" });
        }
      }
    }
  }

  // draw the roads layer

  const roadLayer = tile.layers.transportation;
  let graph = new Graph([], []);
  for (let i = 0; i < roadLayer.length; i++) {
    if (roadLayer.feature(i).type === 2) {
      const geometry = roadLayer.feature(i).loadGeometry()[0];
      const length = geometry.length;
      const roadClass = roadLayer.feature(i).properties.class;

      if (roadClass === "motorway") {
        const points = [];
        for (let j = 0; j < length; j++) {
          const p = new Point(geometry[j].x, geometry[j].y);
          graph.tryAddPoint(p);
          points.push(p);
        }
        for (let j = 0; j < length - 1; j++) {
          const seg = new Segment(points[j], points[j + 1]);
          graph.tryAddSegment(seg);
        }
      }
    }
  }

  graph.draw(ctx);
  // create a canvas texture from myCanvas
  let texture = new THREE.CanvasTexture(myCanvas);

  return (
    <mesh visible={visible} receiveShadow renderOrder={1} {...props}>
      <planeGeometry
        args={[featureScale * extent * scale, featureScale * extent * scale]}
      />
      <meshStandardMaterial
        //color={color}
        depthTest={false}
        envMapIntensity={0.2}
        map={texture}
        //making this layer transparent would mess up the depth sorting
        //transparent
      />
    </mesh>
  );
  // why is a tile as big as 4225
};

export default Canvas2d;
