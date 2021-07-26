import { GameObject } from 'GameSystem';
import Game from 'src/game';
import Shot from './shot.js';
import Enemy from './enemy.js';
import Explosion from './explosion.js';
import { degreesToRadians, createGameImage } from '../utils.js';
import playerImageUrl from 'assets/player.svg';

const playerImage = await createGameImage(playerImageUrl);

export default class Player extends GameObject {
  /**
   * @param {Game} game
   * @param {number} size
   * @param {number} x
   * @param {number} y
   * @param {CanvasRenderingContext2D} context
   * @param {number} movementDelayRange
   */
  constructor(game, size, x, y, movementDelayRange) {
    super(game, size, x, y, playerImage);
    this.movementDelayRange = movementDelayRange;
  }
  /**
   *
   * @param {number} x
   * @param {number} y
   */

  onCollision(collider) {
    if (
      collider instanceof Enemy ||
      (collider instanceof Shot && collider.origin !== this)
    ) {
      this.game.emit(this.game.events.GAME_OVER);
      new Explosion(this.game, this.size, this.x, this.y).spawn();
      this.destroy();
      delete this.game.player;
    }
  }

  shoot() {
    new Shot(
      this.game,
      1 / 20,
      this.center.x,
      this.center.y,
      this.cursorX,
      this.cursorY,
      60,
      600,
      this
    ).spawn();
  }
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  move(x, y) {
    this.cursorX = x;
    this.cursorY = y;
    this.lookAtPoint(x, y);

    const distance = this.getDistanceFromPoint(x, y);

    if (distance > this.movementDelayRange) {
      const movement = distance - this.movementDelayRange;
      this.followPoint(x, y, movement, this.movementDelayRange);
    }
  }
}
