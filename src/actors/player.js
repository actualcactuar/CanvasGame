import GameSystem, { GameObject } from 'GameSystem';
import Shot from './shot.js';
import Enemy from './enemy.js';
import Explosion from './explosion.js';
import { degreesToRadians, createGameImage } from '../utils.js';
import playerImageUrl from 'assets/player.svg';

const playerImage = await createGameImage(playerImageUrl);

export default class Player extends GameObject {
  /**
   * @param {GameSystem} game
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
      400,
      this
    ).spawn();
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
      this.drawHeight, // draw self to own center
      this.drawWidth,
      this.image.height * this.size,
      this.image.width * this.size
    ); // draw player to top left corner, so transform value is correct
    context.restore(); // restore other canvas components
  }
}
