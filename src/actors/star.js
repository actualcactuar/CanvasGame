import { GameObject } from 'GameSystem';
import { createGameImage } from '../utils.js';
import starImageUrl from 'assets/star-duotone.svg';

const starImage = await createGameImage(starImageUrl);

export default class Star extends GameObject {
  /**
   *
   * @param {Game} game
   * @param {number} size
   * @param {number} x
   * @param {number} y
   * @param {Image} image
   */
  constructor(game, size, x, y) {
    super(game, size, x, y, starImage);
  }

  onUpdate() {
    this.lookAt(this.game.player);
    this.follow(this.game.player);
  }
}
