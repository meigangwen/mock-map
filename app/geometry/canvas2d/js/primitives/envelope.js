import { angle, subtract, translate } from "../math/utils.js";
import { Polygon } from "./polygon.js";

export class Envelope {
  constructor(skeleton, width, roundness = 1) {
    this.skeleton = skeleton;
    this.poly = this.#generatePolygon(width, roundness);
  }

  #generatePolygon(width, roundness) {
    const { p1, p2 } = this.skeleton;

    const radius = width / 2;
    const alpha = angle(subtract(p1, p2));
    const alpha_cw = alpha + Math.PI / 2;
    const alpha_ccw = alpha - Math.PI / 2;
    const points = [];
    const step = Math.PI / Math.max(1, roundness);
    const eps = step / 2; // to prevent flickering
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(translate(p1, i, radius));
    }
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(translate(p2, Math.PI + i, radius));
    }

    return new Polygon(points);
  }

  draw(ctx, options) {
    this.poly.draw(ctx, options);
    //debug drawing of segments in random color
    //this.poly.drawSegments(ctx);
  }
}
