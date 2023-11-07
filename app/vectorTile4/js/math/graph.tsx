import { Point } from "../primitives/point";
import { Segment } from "../primitives/segment";

class Graph {
  points: Point[];
  segments: Segment[];
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  //this loading function is not used currently
  /*
  static load(info) {
    // a function to load points and segments stored in JSON file
    const points = info.points.map((i) => new Point(i.x, i.y));
    const segments = info.segments.map(
      (i) =>
        new Segment(
          points.find((p) => p.equals(i.p1)),
          points.find((p) => p.equals(i.p2))
        )
    );
    return new Graph(points, segments);
  }
  */

  addPoint(point: Point) {
    this.points.push(point);
  }

  containsPoint(point: Point) {
    return this.points.find((p) => p.equals(point));
  }

  tryAddPoint(point: Point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  removePoint(point: Point) {
    const segs = this.getSegmentsWithPoint(point);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  containsSegment(seg: Segment) {
    return this.segments.find((s) => s.equals(seg));
  }

  addSegment(seg: Segment) {
    this.segments.push(seg);
  }

  tryAddSegment(seg: Segment) {
    if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  removeSegment(seg: Segment) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  getSegmentsWithPoint(point: Point) {
    const segs = [];
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segs.push(seg);
      }
    }
    return segs;
  }

  dispose() {
    this.points.length = 0;
    this.segments.length = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}

export { Graph };
