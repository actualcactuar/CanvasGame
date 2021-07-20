import GameObject from './gameObject.js';
import Game from './game.js';
import Shot from './shot.js';
import Explosion from './explosion.js';
import Player from './player.js';
import { createGameImage } from '../utils.js';

const enemyImage = createGameImage('assets/enemy.svg');

export default class Enemy extends GameObject {
  /**
   *
   * @param {Game} game
   * @param {number} size
   * @param {number} x
   * @param {number} y
   * @param {Image} image
   */
  constructor(game, size, x, y) {
    super(game, size, x, y, enemyImage);
  }

  onCollision(collider) {
    if (collider instanceof Shot || collider instanceof Player) {
      new Explosion(this.game, this.size, this.x, this.y);
      this.game.pop(this);
    }
  }
}
