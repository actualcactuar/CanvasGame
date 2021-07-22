import GameObject from './gameObject.js';
import { createGameImage } from '../utils.js';
import explosionImageUrl from '../assets/explosion.svg';
const explosionImage = await createGameImage(explosionImageUrl);
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
    this.scale = 0;
    this.alpha = 1;
  }

  onUpdate() {
    switch (true) {
      case this.scale < 2:
        this.scale = this.scale + 0.05;
        break;
      case this.scale > 2 && this.alpha > 0:
        const nextAlpha = this.alpha - 0.1;
        this.alpha = nextAlpha > 0 ? nextAlpha : 0;
        break;
      default:
        this.game.pop(this);
    }
  }

  /**
   *
   * @param {number} xOffset
   * @param {number} yOffset
   */
  drawExplosion(xOffset = 0, yOffset = 0, scaleDelay = 0) {
    const context = this.game.context;
    context.save(); // save context so only player is affected
    context.translate(this.center.x + xOffset, this.center.y + yOffset); // translate image to correct position
    context.scale(this.scale - scaleDelay, this.scale - scaleDelay);
    context.globalAlpha = this.alpha;
    context.drawImage(
      this.image,
      this.drawHeight, // draw self to own center
      this.drawWidth,
      this.image.width * this.size,
      this.image.height * this.size
    ); // draw player to top left corner, so transform value is correct
    context.restore(); // restore other canvas components
  }

  draw() {
    if (this.scale > 0.5) {
      this.drawExplosion(5, 10, 0.5);
    }

    if (this.scale > 0.3) {
      this.drawExplosion(-10, -10, 0.3);
    }

    this.drawExplosion();
  }
}
