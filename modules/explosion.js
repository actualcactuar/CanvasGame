import GameObject from './gameObject.js';
import { createGameImage } from '../utils.js';
const explosionImage = createGameImage('assets/explosion.svg');

export default class Explosion extends GameObject {
  /**
   *
   * @param {Game} game
   * @param {number} size
   * @param {number} x
   * @param {number} y
   * @param {Image} image
   */
  constructor(game, size, x, y) {
    super(game, size, x, y, explosionImage);
    this.targetSize = size;
    this.size = 0.01;
  }

  onUpdate() {
    if (this.size < this.targetSize) {
      this.size = this.size + 0.05;
    }
  }

  // draw() {
  //   const context = this.game.context;
  //   context.save(); // save context so only player is affected
  //   context.translate(this.center.x, this.center.y); // translate image to correct position
  //   context.drawImage(
  //     this.image,
  //     this.drawHeight, // draw self to own center
  //     this.drawWidth,
  //     this.image.width * this.size,
  //     this.image.height * this.size
  //   ); // draw player to top left corner, so transform value is correct
  //   context.restore(); // restore other canvas components
  // }
}
