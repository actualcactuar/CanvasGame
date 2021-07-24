import GameObject from './gameObject.js';
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
    this.context = canvas.getContext('2d');
    this.objectPool = new Set();
    this.context.imageSmoothingEnabled = false;
    this.gameOver = false;
    this.gameWon = false;
    this.spawnPoints = {
      topLeft: [-100, -100],
      topMiddle: [this.canvas.width / 2, -100],
      topRight: [this.canvas.width + 100, -100],
      centerLeft: [-100, this.canvas.height / 2],
      centerMiddle: [this.canvas.width / 2, this.canvas.height / 2],
      centerRight: [this.canvas.width + 100, this.canvas.height / 2],
      bottomLeft: [-100, this.canvas.height + 100],
      bottomMiddle: [this.canvas.width / 2, this.canvas.height + 100],
      bottomRight: [this.canvas.width + 100, this.canvas.height + 100],
    };
    this.spawnPool = new Set();
    this.spawnPoolIterator = this.spawnPool.values();
    this.subscribe(this.events.GAME_OVER, this.onGameOver.bind(this));
    this.subscribe(this.events.GAME_WON, this.onGameWon.bind(this));
    this.onInit();
  }

  addSpawnWave(initializer, gameObjectArgsArray) {
    this.spawnPool.add([initializer, gameObjectArgsArray]);
  }

  nextSpawnWave() {
    const { value: wave, done } = this.spawnPoolIterator.next();
    if (done) {
      this.emit(this.events.SPAWN_POOL_EMPTY);
      return;
    }

    const [initializer, gameObjectArgsArray] = wave;
    gameObjectArgsArray.forEach((args) => {
      const gameObject = new initializer(this, ...args);
      this.spawn(gameObject);
    });
  }

  /**
   *
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

  onGameWon() {
    this.gameWon = true;
  }
  onGameOver() {
    this.gameOver = true;
  }

  onInit() {
    // placeholder, userd with exteding class
  }

  onStart() {
    // placeholder, used with extending class
  }

  FindObjectFromPool(callback) {
    if (typeof callback !== 'function') return;
    let result;
    let iterator = this.objectPool.values();
    while (true) {
      const { done, value } = iterator.next();
      if (done) {
        break;
      }

      if (callback(value)) {
        result = value;
        break;
      }
    }

    return result;
  }

  start() {
    this.onStart();
    this.emit(this.events.UPDATE_HUD);
    this.update();
  }

  update() {
    // clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw all gameobjects to  canvas
    this.objectPool.forEach(
      /**
       * detect collisions between all gameobjects in pool, update and draw
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
