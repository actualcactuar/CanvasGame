import GameObject from './gameObject.js';
import Game from './game.js';

export default class Shot extends GameObject {
  /**
   *
   * @param {Game} game
   * @param {number} size
   * @param {number} x
   * @param {number} y
   * @param {Image} image
   * @param {number} destinationX
   * @param {number} destinationY
   * @param {number} speed
   */
  constructor(game, size, x, y, image, destinationX, destinationY, speed) {
    super(game, size, x, y, image);
    this.destinationX = destinationX;
    this.destinationY = destinationY;
    this.speed = speed;
    this.xDirection = this.center.x > destinationX ? 'left' : 'right';
    this.yDirection = this.center.y > destinationY ? 'up' : 'down';
    const yDistance = destinationY - this.center.y;
    const xDistance = destinationX - this.center.x;
    const distance = Math.hypot(xDistance, yDistance); // get distance between cursor and centerpoint (pyhtagoras)
    const sum = Math.abs(yDistance) + Math.abs(xDistance) + distance; // calculate all sides of the triangle
    this.xEmphasis = Math.abs(xDistance / sum); // get percentual size x side of triange
    this.yEmphasis = Math.abs(yDistance / sum); // same for y
  }

  onUpdate() {
    this.x =
      this.xDirection === 'left'
        ? this.x - 1 * this.speed * this.xEmphasis
        : this.x + 1 * this.speed * this.xEmphasis;

    this.y =
      this.yDirection === 'up'
        ? this.y - 1 * this.speed * this.yEmphasis
        : this.y + 1 * this.speed * this.yEmphasis;
  }

  draw() {
    const context = this.game.context;
    context.save(); // save context so only player is affected
    // context.translate(this.center.x, this.center.y); // translate image to correct position
    context.drawImage(
      this.image,
      this.center.x, // draw self to own center
      this.center.y,
      this.size,
      this.size
    ); // draw player to top left corner, so transform value is correct
    context.restore(); // restore other canvas components
  }
}
