export default class GameObject {
  /**
   *
   * @param {number} size
   * @param {string} color
   * @param {number} x
   * @param {number} y
   * @param {CanvasRenderingContext2D} context
   */
  constructor(size, color, x, y, context) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.context = context;
  }

  onUpdate() {
    // called on each update, boilerplate
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.size, this.size);
  }
}
