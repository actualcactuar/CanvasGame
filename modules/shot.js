import GameObject from './gameObject.js';
import Game from './game.js';
import Enemy from './enemy.js';
import Explosion from './explosion.js';
import Player from './player.js';
import { createGameImage } from '../src/utils.js';

const shotImage = await createGameImage('assets/laser.svg');

export default class Shot extends GameObject {
  /**
   *
   * @param {Game} game
   * @param {number} size
   * @param {number} x
   * @param {number} y
   * @param {number} destinationX
   * @param {number} destinationY
   * @param {number} speed
   * @param {number} range
   */
  constructor(
    game,
    size,
    x,
    y,
    xDestination,
    yDestination,
    speed,
    range,
    origin,
    image
  ) {
    super(game, size, x, y, shotImage);
    this.xDestination = xDestination;
    this.yDestination = yDestination;
    this.speed = speed;
    this.xOrigin = x;
    this.yOrigin = y;
    this.xDirection = this.xOrigin > this.xDestination ? 'left' : 'right';
    this.yDirection = this.yOrigin > this.yDestination ? 'up' : 'down';
    const a = this.yDestination - this.yOrigin;
    const b = this.xDestination - this.xOrigin;
    const c = Math.hypot(b, a);
    const sumOfAllSides = Math.abs(a) + Math.abs(b) + c;
    this.xEmphasis = Math.abs(b / sumOfAllSides);
    this.yEmphasis = Math.abs(a / sumOfAllSides);
    this.range = range;
    this.origin = origin;

    if (image) {
      this.image = image;
    }
  }

  get distanceFromOriginPoint() {
    const a = this.xOrigin - this.center.x;
    const b = this.yOrigin - this.center.y;
    return Math.hypot(a, b);
  }

  onCollision(collider) {
    if (
      ((collider instanceof Enemy || collider instanceof Player) &&
        collider !== this.origin) ||
      (collider instanceof Shot && collider !== this)
    ) {
      new Explosion(this.game, this.size / 2, this.x, this.y);
      this.game.pop(this);
    }
  }

  onUpdate() {
    this.x =
      this.xDirection === 'left'
        ? this.x - 1 * this.speed * this.xEmphasis
        : this.x + 1 * this.speed * this.xEmphasis;

    this.y =
      this.yDirection === 'up'
        ? this.y - 1 * this.speed * this.yEmphasis
        : this.y + 1 * this.speed * this.yEmphasis;

    if (this.distanceFromOriginPoint > this.range) {
      this.game.pop(this);
    }
  }

  draw() {
    const context = this.game.context;
    context.save(); // save context so only player is affected
    context.translate(this.x, this.y); // translate image to correct position
    context.drawImage(
      this.image,
      this.drawHeight, // draw self to own center
      this.drawWidth,
      this.image.width * this.size,
      this.image.height * this.size
    ); // draw player to top left corner, so transform value is correct
    context.restore(); // restore other canvas components
  }
}
