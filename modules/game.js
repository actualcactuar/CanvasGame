import Player from './player.js';
import GameObject from './gameObject.js';

const playerSprite = new Image();
playerSprite.src = '../assets/starfighter-duotone.svg';
playerSprite.width = playerSprite.naturalWidth;
playerSprite.height = playerSprite.naturalHeight;

export default class Game {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.style.backgroundColor = '#242a35';
    this.context = canvas.getContext('2d');
    this.objectPool = new Set();
    this.context.imageSmoothingEnabled = false;
    this.onstart = () => {
      console.log('[Game::onstart] use this thi your update logic');
    };
  }

  /**
   *
   * @param {GameObject} gameObject
   */
  spawn(gameObject) {
    this.objectPool.add(gameObject);
  }

  start(x, y) {
    this.player = new Player(
      48,
      'orange',
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.context,
      96,
      playerSprite
    );
    this.spawn(this.player);
    this.player.move(x, y);
    if (typeof this.onstart === 'function') this.onstart();
    this.update();
  }

  update() {
    // clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw all gameobjects to  canvas
    this.objectPool.forEach(
      /**
       *
       * @param {GameObject} gameObject
       */
      (gameObject) => {
        gameObject.onUpdate();
        gameObject.draw();
      }
    );

    // request new frame for new loop
    window.requestAnimationFrame(this.update.bind(this));
  }
}
