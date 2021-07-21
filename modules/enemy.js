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
   * @param {number} speed
   */
  constructor(game, size, x, y, speed) {
    super(game, size, x, y, enemyImage);
    this.speed = speed;
  }

  calculateDirection() {
    const a = this.game.player.center.x - this.center.x;
    const b = this.game.player.center.y - this.center.y;
    const c = Math.hypot(b, a);
    const sumOfAllSides = Math.abs(a) + Math.abs(b) + c;

    this.xDirection =
      this.center.x > this.game.player.center.x ? 'left' : 'right';
    this.yDirection = this.center.y > this.game.player.center.y ? 'up' : 'down';
    this.xEmphasis = Math.abs(a / sumOfAllSides);
    this.yEmphasis = Math.abs(b / sumOfAllSides);
    this.distanceFromPlayer = c;
  }

  followPlayer() {
    this.calculateDirection();

    this.x =
      this.xDirection === 'left' // plus or minus depending on direction
        ? this.x - this.speed * this.xEmphasis // multiply movement with percentual value of size of the side so movement has correct acceleration
        : this.x + this.speed * this.xEmphasis;
    this.y =
      this.yDirection === 'up'
        ? this.y - this.speed * this.yEmphasis
        : this.y + this.speed * this.yEmphasis;
  }

  onUpdate() {
    this.followPlayer();
  }

  onCollision(collider) {
    if (
      collider instanceof Shot ||
      collider instanceof Player ||
      collider instanceof Enemy
    ) {
      new Explosion(this.game, this.size, this.x, this.y);
      this.game.pop(this);
    }
  }
}
