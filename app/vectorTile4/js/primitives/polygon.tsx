import { Point } from "./point";
import { Segment } from "./segment";
import { getIntersection, average, getRandomColor } from "../math/utils";

class Polygon {
  points: Point[];
  segments: Segment[];

  constructor(points: Point[]) {
    this.points = points;
    this.segments = [];
    for (let i = 1; i <= points.length; i++) {
      this.segments.push(new Segment(points[i - 1], points[i % points.length]));
    }
  }

  containsSegment(seg: Segment) {
    const midpoint = average(seg.p1, seg.p2);
    return this.containsPoint(midpoint);
  }

  containsPoint(point: Point) {
    // define an outer point that is far away, but for other project, this may not work
    const outerPoint = new Point(-1000, -1000);
    let intersectionCount = 0;
    for (const seg of this.segments) {
      const int = getIntersection(outerPoint, point, seg.p1, seg.p2);
      if (int) {
        intersectionCount++;
      }
    }
    // if count is even, the polygon does not contain the point
    // if count is odd, the polygon contains the point
    return intersectionCount % 2 == 1;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    {
      outline = false,
      stroke = "blue",
      lineWidth = 2,
      fill = "rgba(0,0,255,1.0)",
    } = {}
  ) {
    ctx.beginPath();
    ctx.fillStyle = fill;
    if (outline) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
    }
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.closePath();
    ctx.fill();
    if (outline) {
      ctx.stroke();
    }
  }
}

export { Polygon };
