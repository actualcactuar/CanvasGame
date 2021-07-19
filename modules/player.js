import GameObject from './gameObject.js';
import Game from './game.js';
import Shot from './shot.js';
import { degreesToRadians, createGameImage } from '../utils.js';

const shotImage = createGameImage('assets/circle-duotone.svg');

export default class Player extends GameObject {
  /**
   * @param {Game} game
   * @param {number} size
   * @param {Image} playerImage
   * @param {number} x
   * @param {number} y
   * @param {CanvasRenderingContext2D} context
   * @param {number} movementDelayRange
   */
  constructor(game, size, x, y, image, movementDelayRange) {
    super(game, size, x, y, image);
    this.movementDelayRange = movementDelayRange;
  }
  /**
   *
   * @param {number} x
   * @param {number} y
   */

  shoot() {
    new Shot(
      this.game,
      16,
      this.center.x,
      this.center.y,
      shotImage,
      this.cursorX,
      this.cursorY,
      36
    );
  }
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  move(x, y) {
    const yDistance = y - this.center.y;
    const xDistance = x - this.center.x;
    const distance = Math.hypot(xDistance, yDistance); // get distance between cursor and centerpoint (pyhtagoras)
    const sum = Math.abs(yDistance) + Math.abs(xDistance) + distance; // calculate all sides of the triangle

    this.cursorX = x;
    this.cursorY = y;

    if (distance > this.movementDelayRange) {
      const movement = distance - this.movementDelayRange; // get the actual movement by decrementing delayrange (that sirce thing size)
      const xEmphasis = Math.abs(xDistance / sum); // get percentual size x side of triange
      const yEmphasis = Math.abs(yDistance / sum); // same for y
      const xDirection = this.center.x > x ? 'left' : 'right';
      const yDirection = this.center.y > y ? 'up' : 'down';
      this.x =
        xDirection === 'left' // plus or minus depending on direction
          ? this.x - movement * xEmphasis // multiply movement with percentual value of size of the side so movement has correct acceleration
          : this.x + movement * xEmphasis;
      this.y =
        yDirection === 'up'
          ? this.y - movement * yEmphasis
          : this.y + movement * yEmphasis;
    }
  }

  /**
   * @override
   */
  draw() {
    const context = this.game.context;

    context.strokeStyle = '#dadada';

    context.save(); // save context so only player is affected
    context.translate(this.center.x, this.center.y); // translate image to correct position
    const radian = degreesToRadians(90); // for some reason image is rotate 90 degs, counter this with that
    const angle = Math.atan2(
      this.center.y - this.cursorY,
      this.center.x - this.cursorX
    ); // calculate angle differencce between cursor and center point
    context.rotate(angle - radian); // rotate player
    context.drawImage(
      this.image,
      -1 * (this.size / 2), // draw self to own center
      -1 * (this.size / 2),
      this.size,
      this.size
    ); // draw player to top left corner, so transform value is correct
    context.restore(); // restore other canvas components

    // range redius
    // context.beginPath();
    // context.arc(
    //   this.x - this.size / 2,
    //   this.y - this.size / 2,
    //   this.movementDelayRange,
    //   0,
    //   2 * Math.PI
    // );
    // context.stroke();
    // context.closePath();
  }
}
