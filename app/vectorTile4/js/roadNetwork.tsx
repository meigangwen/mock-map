import { Envelope } from "./primitives/envelope";
import { Polygon } from "./primitives/polygon";
import { Segment } from "./primitives/segment";
import { Graph } from "./math/graph";

class RoadNetwork {
  graph: Graph;
  roadWidth: number;
  roadRoundness: number;
  envelopes: Envelope[];
  roadBorders: Segment[];
  drawRoadBorders: boolean;

  constructor(
    graph: Graph,
    roadWidth = 100,
    roadRoundness = 10,
    drawRoadBorders = true
  ) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundness = roadRoundness;

    this.envelopes = [];
    this.roadBorders = [];
    this.drawRoadBorders = drawRoadBorders;
    this.generate();
  }

  generate() {
    this.envelopes.length = 0;
    for (const seg of this.graph.segments) {
      this.envelopes.push(
        new Envelope(seg, this.roadWidth, this.roadRoundness)
      );
    }
    if (this.drawRoadBorders) {
      this.roadBorders = Polygon.union(this.envelopes.map((e) => e.poly));
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const env of this.envelopes) {
      env.draw(ctx, { fill: "#BBB" });
    }

    for (const seg of this.graph.segments) {
      seg.draw(ctx, { color: "white", width: 2, dash: [10, 10] });
    }
    if (this.drawRoadBorders) {
      for (const seg of this.roadBorders) {
        seg.draw(ctx, { color: "white", width: 2 });
      }
    }
  }
}

export { RoadNetwork };
