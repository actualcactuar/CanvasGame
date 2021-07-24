import Game from 'src/game';
import { GameObject } from 'GameSystem';
import Shot from './shot.js';
import Explosion from './explosion.js';
import Player from './player.js';
import { createGameImage } from '../utils.js';
import enemyImageUrl from 'assets/enemy.svg';
import enemyLaserImageUrl from 'assets/enemy-laser.svg';

const enemyImage = await createGameImage(enemyImageUrl);
const enemyLaser = await createGameImage(enemyLaserImageUrl);

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
    this.lastFiredTime = Date.now();
    this.rateOfFire = rateOfFire;
  }

  shootPlayer() {
    new Shot(
      this.game,
      1 / 20,
      this.center.x,
      this.center.y,
      this.game.player.center.x,
      this.game.player.center.y,
      15,
      400,
      this,
      enemyLaser
    ).spawn();
  }

  onUpdate() {
    if (!this.game.player) return;

    if (Date.now() - this.lastFiredTime > this.rateOfFire) {
      this.lastFiredTime = Date.now();
      this.shootPlayer();
    }

    this.lookAtPoint(this.game.player.center.x, this.game.player.center.y);
    this.followPoint(
      this.game.player.center.x,
      this.game.player.center.y,
      this.speed
    );
  }

  onDeath() {
    new Explosion(this.game, this.size, this.x, this.y).spawn();
    this.destroy();
    this.game.addScore(100);
    if (this.game.currentEnemyWaveDefeated) {
      this.game.nextSpawnWave();
    }
  }

  onCollision(collider) {
    if (
      (collider instanceof Shot && collider.origin !== this) ||
      collider instanceof Player ||
      collider instanceof Enemy
    ) {
      this.onDeath();
    }
  }
}
