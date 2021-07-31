import { degreesToRadians } from '../src/utils.js';

/**
 * @typedef {import("./core.js").default} Game
 */
export default class GameObject {
  /**
   *
   * @param {Game} game
   * @param {number} size
   * @param {number} x
   * @param {number} y
   * @param {Image} image
   */
  constructor(game, size, x, y, image) {
    this.game = game;
    this.size = size;
    this.x = x;
    this.y = y;
    this.image = image;
  }

  get width() {
    return this.image.width * this.size;
  }
  get height() {
    return this.image.height * this.size;
  }

  get drawHeight() {
    return -1 * ((this.image.height * this.size) / 2);
  }

  get drawWidth() {
    return -1 * ((this.image.width * this.size) / 2);
  }

  get center() {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
    };
  }

  /**
   *
   * @param {GameObject} gameObject
   * @returns
   */
  getDistanceFromPoint(x, y) {
    const a = x - this.center.x;
    const b = y - this.center.y;
    return Math.hypot(b, a);
  }

  spawn() {
    this.game.spawn(this);
  }

  destroy() {
    this.game.pop(this);
  }
  /**
   * follows gameobject given as target
   * @param {GameObject} gameObject
   */
  followPoint(x, y, movement = 1, distance = 0) {
    const a = x - this.center.x;
    const b = y - this.center.y;
    const c = Math.hypot(b, a);
    const sumOfAllSides = Math.abs(a) + Math.abs(b) + c;

    const xAxisMovementDirection = this.center.x > x ? 'left' : 'right';
    const yAxisMovementDirection = this.center.y > y ? 'up' : 'down';
    const xAxisMovementEmphasis = Math.abs(a / sumOfAllSides);
    const yAxisMovementEmphasis = Math.abs(b / sumOfAllSides);

    if (c > distance) {
      this.x =
        xAxisMovementDirection === 'left' // plus or minus depending on direction
          ? this.x - movement * xAxisMovementEmphasis // multiply movement with percentual value of size of the side so movement has correct acceleration
          : this.x + movement * xAxisMovementEmphasis;
      this.y =
        yAxisMovementDirection === 'up'
          ? this.y - movement * yAxisMovementEmphasis
          : this.y + movement * yAxisMovementEmphasis;
    }
  }

  /**
   *
   * @param {GameObject} gameObject
   */
  lookAtPoint(x, y) {
    const turn = degreesToRadians(90);
    const angle = Math.atan2(this.center.y - y, this.center.x - x);
    this.rotate = angle - turn;
  }

  onUpdate() {
    // placeholder, called on each update
  }

  onCollision(gameObject) {
    // placeholder, called when items collide
  }

  draw() {
    const context = this.game.context;
    context.save(); // save context so only player is affected
    context.translate(this.center.x, this.center.y); // translate image to correct position
    if (this.rotate) {
      context.rotate(this.rotate);
    }
    context.drawImage(
      this.image,
      this.drawWidth, // draw self to own center
      this.drawHeight,
      this.width,
      this.height
    ); // draw player to top left corner, so transform value is correct
    context.restore(); // restore other canvas components
  }
}
