import Player from './player.js';
import GameObject from './gameObject.js';
import Enemy from './enemy.js';

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
  }

  /**
   * spawns  gameobject to pool
   * @param {GameObject} gameObject
   */
  spawn(gameObject) {
    this.objectPool.add(gameObject);
  }

  /**
   * deletes gameobject from pool
   * @param {GameObject} gameObject
   */
  pop(gameObject) {
    this.objectPool.delete(gameObject);
  }

  onStart() {
    // placeholder, called on start
  }

  start(x, y) {
    this.player = new Player(
      this,
      1 / 3,
      this.canvas.width / 2,
      this.canvas.height / 2,
      96
    );
    this.player.move(x, y);

    new Enemy(this, 1 / 4, 100, 100);
    new Enemy(this, 1 / 4, 200, 400);
    new Enemy(this, 1 / 4, 150, 600);
    this.onStart();
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
        this.objectPool.forEach(
          /**
           *
           * @param {GameObject} object
           * @returns
           */
          (collidingObject) => {
            if (collidingObject === gameObject) return;
            const xDiff = Math.abs(
              collidingObject.center.x - gameObject.center.x
            );
            const yDiff = Math.abs(
              collidingObject.center.y - gameObject.center.y
            );
            if (
              xDiff < collidingObject.width &&
              yDiff < collidingObject.height
            ) {
              collidingObject.onCollision(gameObject);
              gameObject.onCollision(collidingObject);
            }
          }
        );
        gameObject.onUpdate();
        gameObject.draw();
      }
    );

    // request new frame for new loop
    window.requestAnimationFrame(this.update.bind(this));
  }
}
