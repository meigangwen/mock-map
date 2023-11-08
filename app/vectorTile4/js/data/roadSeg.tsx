//import { Point } from "../primitives/point";
//import { Segment } from "../primitives/segment";

class RoadSeginfo {
  //seg: Segment;
  roadWidth: number;
  //roadRoundness: number;
  class: String;
  //color: String;
  layer: number;

  constructor(seg: Segment) {
    this.seg = seg;
  }

  /*
  equals(seg: Segment) {
    return this.includes(seg.p1) && this.includes(seg.p2);
  }

  includes(point: Point) {
    return this.p1.equals(point) || this.p2.equals(point);
  }

  draw(
    ctx: CanvasRenderingContext2D,
    { width = 2, color = "black", dash = [] } = {}
  ) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash);
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  */
}

export { RoadSeginfo };
