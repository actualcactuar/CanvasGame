import GameObject from './gameObject.js';
import Game from './game.js';
import Shot from './shot.js';

export default class Enemy extends GameObject {
  /**
   *
   * @param {Game} game
   * @param {number} size
   * @param {number} x
   * @param {number} y
   * @param {Image} image
   */
  constructor(game, size, x, y, image) {
    super(game, size, x, y, image);
  }

  onCollision(collider) {
    if (collider instanceof Shot) {
      this.game.pop(this);
    }
  }
}
