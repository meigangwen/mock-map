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
import { Point } from "../js/primitives/point";
import { Segment } from "../js/primitives/segment";
import { Polygon } from "../js/primitives/polygon";
import { Graph } from "../js/math/graph";
import { RoadNetwork } from "../js/roadNetwork";

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

  // dynamically create an html canvas
  let myCanvas = document.createElement("canvas");
  myCanvas.id = "myCanvas";
  myCanvas.width = extent;
  myCanvas.height = extent;
  const ctx = myCanvas.getContext("2d");

  // draw a background color
  const bgColor = "#767676";
  ctx.fillStyle = bgColor;
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
      const points = geometry[0].map((p) => new Point(p.x, p.y));
      const polygon = new Polygon(points);
      polygon.draw(ctx, { fill: color });
    } else {
      // need to run test to check for holes
      for (let j = 0; j < geometry.length; j++) {
        const ring = geometry[j];
        const area = signedArea(ring);
        const points = geometry[j].map((p) => new Point(p.x, p.y));
        if (area > 0) {
          const polygon = new Polygon(points);
          polygon.draw(ctx, { fill: color });
        }
        if (area < 0) {
          const hole = new Polygon(points);
          hole.draw(ctx, { fill: bgColor });
        }
      }
    }
  }

  // draw the water layer
  // there are some drawing errors here
  const waterLayer = tile.layers.water;
  for (let i = 0; i < waterLayer.length; i++) {
    const geometry = waterLayer.feature(i).loadGeometry();
    if (geometry.length === 1) {
      const points = geometry[0].map((p) => new Point(p.x, p.y));
      const polygon = new Polygon(points);
      polygon.draw(ctx, { fill: "#1eb4ff" });
    } else {
      // need to run test to check for holes
      for (let j = 0; j < geometry.length; j++) {
        const ring = geometry[j];
        const area = signedArea(ring);
        const points = geometry[j].map((p) => new Point(p.x, p.y));
        if (area > 0) {
          const polygon = new Polygon(points);
          polygon.draw(ctx, { fill: "#1eb4ff" });
        }
        if (area < 0) {
          const hole = new Polygon(points);
          hole.draw(ctx, { fill: bgColor });
        }
      }
    }
  }

  // draw the roads layer

  const roadLayer = tile.layers.transportation;

  // creating the graphs that represent road networks
  const roadGraph = new Graph([], []);
  const pathGraph = new Graph([], []);
  for (let i = 0; i < roadLayer.length; i++) {
    if (roadLayer.feature(i).type === 2) {
      const geometry = roadLayer.feature(i).loadGeometry()[0];
      const length = geometry.length;
      const roadClass = roadLayer.feature(i).properties.class;
      const layer = roadLayer.feature(i).properties.layer;
      //console.log(layer);

      if (
        roadClass === "minor" ||
        roadClass === "motorway" ||
        roadClass === "primary" ||
        roadClass === "secondary" ||
        roadClass === "trunk"
      ) {
        //roadClass === "service"
        const points = [];
        for (let j = 0; j < length; j++) {
          const p = new Point(geometry[j].x, geometry[j].y);

          roadGraph.tryAddPoint(p);
          points.push(p);
        }
        for (let j = 0; j < length - 1; j++) {
          const seg = new Segment(points[j], points[j + 1]);

          roadGraph.tryAddSegment(seg);
        }
      }

      if (roadClass === "path") {
        const points = [];
        for (let j = 0; j < length; j++) {
          const p = new Point(geometry[j].x, geometry[j].y);

          pathGraph.tryAddPoint(p);
          points.push(p);
        }
        for (let j = 0; j < length - 1; j++) {
          const seg = new Segment(points[j], points[j + 1]);

          pathGraph.tryAddSegment(seg);
        }
      }
    }
  }

  const trunk = new RoadNetwork(roadGraph, 20, 5, false);
  trunk.generate();
  trunk.draw(ctx);

  /*
  roadGraph.draw(ctx, {
    drawPoints: true,
    pointSize: 10,
    pointColor: "red",
    drawSegments: true,
    segWidth: 2,
    segColor: "white",
  });
  */

  /*
  pathGraph.draw(ctx, {
    drawPoints: false,
    drawSegments: true,
    segWidth: 2,
    segColor: "white",
  });
  */

  // create a canvas texture from myCanvas
  let texture = new THREE.CanvasTexture(myCanvas);

  return (
    <mesh visible={visible} receiveShadow renderOrder={1} {...props}>
      <planeGeometry args={[featureScale * extent, featureScale * extent]} />
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
