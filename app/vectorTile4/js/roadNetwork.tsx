import { Envelope } from "./primitives/envelope";
import { Polygon } from "./primitives/polygon";
import { Segment } from "./primitives/segment";
import { Graph } from "./math/graph";

class RoadNetwork {
  graph: Graph;
  roadWidth: number;
  roadRoundness: number;
  envelopes: Envelope[];

  constructor(graph: Graph, roadWidth = 100, roadRoundness = 10) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundness = roadRoundness;

    this.envelopes = [];
    this.generate();
  }

  generate() {
    this.envelopes.length = 0;
    for (const seg of this.graph.segments) {
      const roadWidth = seg.width ? Number(seg.width) : this.roadWidth;
      this.envelopes.push(
        new Envelope(seg, roadWidth, this.roadRoundness, seg.color)
      );
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    //draw in the order of layers
    //const layer = 1;
    for (let i = -1; i <= 2; i++) {
      for (const env of this.envelopes) {
        if (env.skeleton.layer === i) {
          env.draw(ctx);
        }
      }

      for (const seg of this.graph.segments) {
        if (seg.layer === i) {
          const drawDash = seg.drawDash;
          if (drawDash) {
            seg.draw(ctx, {
              color: "white",
              width: seg.dashWidth,
              dash: [10, 10],
            });
          }
        }
      }
    }
  }
}

export { RoadNetwork };
