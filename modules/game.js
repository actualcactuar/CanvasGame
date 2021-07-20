import Player from './player.js';
import GameObject from './gameObject.js';
import { createGameImage } from '../utils.js';
import Enemy from './enemy.js';

const enemyImage = createGameImage('assets/starfighter-alt-duotone.svg');
const playerImage = createGameImage('assets/starfighter-duotone.svg');

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
      this,
      1 / 3,
      this.canvas.width / 2,
      this.canvas.height / 2,
      playerImage,
      96
    );
    this.player.move(x, y);

    new Enemy(this, 1 / 3, 100, 100, enemyImage);
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
