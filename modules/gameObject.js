import Game from './game.js';

export default class GameObject {
  /**
   *
   * @param {Game} game
   * @param {number} size
   * @param {number} x
   * @param {number} y
   * @param {Image} image
   */
  constructor(game, size, x, y, image) {
    this.game = game;
    this.size = size;
    this.x = x;
    this.y = y;
    this.image = image;
    this.game.spawn(this);
  }

  get center() {
    return { x: this.x - this.size / 2, y: this.y - this.size / 2 };
  }

  onUpdate() {
    // called on each update, boilerplate
  }

  draw() {
    const context = this.game.context;
    context.save(); // save context so only player is affected
    // context.translate(this.center.x, this.center.y); // translate image to correct position
    context.drawImage(
      this.image,
      this.center.x, // draw self to own center
      this.center.y,
      this.size,
      this.size
    ); // draw player to top left corner, so transform value is correct
    context.restore(); // restore other canvas components
  }
}
