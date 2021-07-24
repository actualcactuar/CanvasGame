import Game from './game.js';
import { degreesToRadians } from '../src/utils.js';

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
    this.game.spawn(this);
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
      x: this.x - (this.image.width * this.size) / 2,
      y: this.y - (this.image.height * this.size) / 2,
    };
  }

  /**
   *
   * @param {GameObject} gameObject
   * @returns
   */
  getDistanceFrom(gameObject) {
    const a = gameObject.center.x - this.center.x;
    const b = gameObject.center.y - this.center.y;
    return Math.hypot(b, a);
  }

  /**
   * follows gameobject given as target
   * @param {GameObject} gameObject
   */
  follow(gameObject) {
    let speed = this.speed;
    if (!speed) speed = 5;

    const a = gameObject.center.x - this.center.x;
    const b = gameObject.center.y - this.center.y;
    const c = Math.hypot(b, a);
    const sumOfAllSides = Math.abs(a) + Math.abs(b) + c;

    const xAxisMovementDirection =
      this.center.x > gameObject.center.x ? 'left' : 'right';
    const yAxisMovementDirection =
      this.center.y > gameObject.center.y ? 'up' : 'down';
    const xAxisMovementEmphasis = Math.abs(a / sumOfAllSides);
    const yAxisMovementEmphasis = Math.abs(b / sumOfAllSides);

    this.x =
      xAxisMovementDirection === 'left' // plus or minus depending on direction
        ? this.x - speed * xAxisMovementEmphasis // multiply movement with percentual value of size of the side so movement has correct acceleration
        : this.x + speed * xAxisMovementEmphasis;
    this.y =
      yAxisMovementDirection === 'up'
        ? this.y - speed * yAxisMovementEmphasis
        : this.y + speed * yAxisMovementEmphasis;
  }

  /**
   *
   * @param {GameObject} gameObject
   */
  lookAt(gameObject) {
    const turn = degreesToRadians(90);
    const angle = Math.atan2(
      this.y - gameObject.center.y,
      this.x - gameObject.center.x
    );
    this.rotate = turn + angle;
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
      this.drawHeight, // draw self to own center
      this.drawWidth,
      this.image.width * this.size,
      this.image.height * this.size
    ); // draw player to top left corner, so transform value is correct
    context.restore(); // restore other canvas components
  }
}
