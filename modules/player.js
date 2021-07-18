import GameObject from './gameObject.js';

export default class Player extends GameObject {
  /**
   *
   * @param {number} size
   * @param {string} color
   * @param {number} x
   * @param {number} y
   * @param {CanvasRenderingContext2D} context
   * @param {number} movementDelayRange
   */
  constructor(size, color, x, y, context, movementDelayRange) {
    super(size, color, x, y, context);
    this.movementDelayRange = movementDelayRange;
  }
  /**
   *
   * @param {number} x
   * @param {number} y
   */

  get center() {
    return { x: this.x - this.size / 2, y: this.y - this.size / 2 };
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  move(x, y) {
    const yDistance = y - this.center.y;
    const xDistance = x - this.center.x;
    const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    const sum = Math.abs(yDistance) + Math.abs(xDistance) + distance;

    if (distance > this.movementDelayRange) {
      const movement = distance - this.movementDelayRange;
      const xEmphasis = Math.abs(xDistance / sum);
      const yEmphasis = Math.abs(yDistance / sum);
      const xDirection = this.center.x > x ? 'left' : 'right';
      const yDirection = this.center.y > y ? 'up' : 'down';
      this.x =
        xDirection === 'left'
          ? this.x - movement * xEmphasis
          : this.x + movement * xEmphasis;
      this.y =
        yDirection === 'up'
          ? this.y - movement * yEmphasis
          : this.y + movement * yEmphasis;
    }
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.strokeStyle = '#dadada';

    // player
    this.context.beginPath();
    this.context.arc(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      0,
      2 * Math.PI
    );
    this.context.fill();
    this.context.closePath();

    // range redius
    this.context.beginPath();
    this.context.arc(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.movementDelayRange,
      0,
      2 * Math.PI
    );
    this.context.stroke();
    this.context.closePath();
  }
}
