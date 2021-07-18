import GameObject from './gameObject.js';

export default class Player extends GameObject {
  /**
   *
   * @param {number} size
   * @param {string} color
   * @param {number} x
   * @param {number} y
   * @param {CanvasRenderingContext2D} context
   */
  constructor(size, color, x, y, context) {
    super(size, color, x, y, context);
  }
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  move(x, y) {
    this.x = x;
    this.y = y;
  }
}
