import Player from './player.js';
import GameObject from './gameObject.js';
import Enemy from './enemy.js';
import * as GameEvents from './events.js';
import EventEmitter from './eventEmitter.js';

export default class Game extends EventEmitter {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    super();
    this.events = GameEvents;
    this.canvas = canvas;
    this.canvas.style.backgroundColor = '#242a35';
    this.context = canvas.getContext('2d');
    this.objectPool = new Set();
    this.context.imageSmoothingEnabled = false;
    this.gameOver = false;
    this.score = 0;
    this.subscriptions = new Map();
    this.spawnPoints = {
      topLeft: [100, 100],
      topMiddle: [this.canvas.width / 2, 100],
      topRight: [this.canvas.width - 100, 100],
      centerLeft: [100, this.canvas.height / 2],
      centerMiddle: [this.canvas.width / 2, this.canvas.height / 2],
      centerRight: [this.canvas.width - 100, this.canvas.height / 2],
      bottomLeft: [100, this.canvas.height - 100],
      bottomMiddle: [this.canvas.width / 2, this.canvas.height - 100],
      bottomRight: [this.canvas.width - 100, this.canvas.height - 100],
    };

    this.subscribe(this.events.GAME_OVER, this.onGameOver.bind(this));
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

  onGameOver() {
    this.gameOver = true;
    window.clearTimeout(this.midSpawn);
    window.clearTimeout(this.lastSpawn);
  }

  start(x, y) {
    this.player = new Player(this, 1 / 3, ...this.spawnPoints.centerMiddle, 96);
    this.player.move(x, y);

    new Enemy(this, 1 / 4, ...this.spawnPoints.topLeft, 7);
    new Enemy(this, 1 / 4, ...this.spawnPoints.centerRight, 7);

    this.midSpawn = setTimeout(() => {
      new Enemy(this, 1 / 4, ...this.spawnPoints.bottomMiddle, 7);
      new Enemy(this, 1 / 4, ...this.spawnPoints.bottomLeft, 7);
    }, 5000);

    this.lastSpawn = setTimeout(() => {
      new Enemy(this, 1 / 4, ...this.spawnPoints.centerLeft, 7);
      new Enemy(this, 1 / 4, ...this.spawnPoints.topRight, 7);
      new Enemy(this, 1 / 4, ...this.spawnPoints.bottomRight, 7);
    }, 10000);

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
