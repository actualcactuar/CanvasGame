import GameObject from './gameObject.js';
import { createGameImage } from '../utils.js';

const starImage = await createGameImage('assets/star-duotone.svg');

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
}
