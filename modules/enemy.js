import GameObject from './gameObject.js';
import Game from './game.js';
import Shot from './shot.js';
import Explosion from './explosion.js';
import Player from './player.js';
import { createGameImage, degreesToRadians } from '../utils.js';

const enemyImage = createGameImage('assets/enemy.svg');
const enemyLaser = createGameImage('assets/enemy-laser.svg');

export default class Enemy extends GameObject {
  /**
   *
   * @param {Game} game
   * @param {number} size
   * @param {number} x
   * @param {number} y
   * @param {Image} image
   * @param {number} speed
   * @param {number} rateOfFire
   */
  constructor(game, size, x, y, speed, rateOfFire = 2000) {
    super(game, size, x, y, enemyImage);
    this.speed = speed;
    this.lastFiredTime = rateOfFire / 2;
    this.rateOfFire = rateOfFire;
  }

  calculateDirection() {
    if (!this.game.player) {
      this.speed = 0;
      return;
    }

    const a = this.playerX - this.center.x;
    const b = this.playerY - this.center.y;
    const c = Math.hypot(b, a);
    const sumOfAllSides = Math.abs(a) + Math.abs(b) + c;

    this.xDirection = this.center.x > this.playerX ? 'left' : 'right';
    this.yDirection = this.center.y > this.playerY ? 'up' : 'down';
    this.xEmphasis = Math.abs(a / sumOfAllSides);
    this.yEmphasis = Math.abs(b / sumOfAllSides);
    this.distanceFromPlayer = c;
  }

  shootPlayer() {
    new Shot(
      this.game,
      1 / 8,
      this.center.x,
      this.center.y,
      this.game.player.center.x,
      this.game.player.center.y,
      15,
      400,
      this,
      enemyLaser
    );
  }

  targetPlayer() {
    if (!this.game.player) {
      this.speed = 0;
      return;
    }

    this.playerX = this.game.player.center.x;
    this.playerY = this.game.player.center.y;

    this.calculateDirection();

    if (Date.now() - this.lastFiredTime > this.rateOfFire) {
      this.lastFiredTime = Date.now();
      this.shootPlayer();
    }

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
    this.targetPlayer();
  }

  onCollision(collider) {
    if (
      (collider instanceof Shot && collider.origin !== this) ||
      collider instanceof Player ||
      collider instanceof Enemy
    ) {
      new Explosion(this.game, this.size, this.x, this.y);
      this.game.pop(this);
    }
  }

  draw() {
    const context = this.game.context;
    const turn = degreesToRadians(90);
    const angle = Math.atan2(this.y - this.playerY, this.x - this.playerX);

    context.save();
    context.translate(this.center.x, this.center.y);
    context.rotate(angle + turn);
    context.drawImage(
      this.image,
      this.drawHeight,
      this.drawWidth,
      this.image.width * this.size,
      this.image.height * this.size
    );
    context.restore();
  }
}
