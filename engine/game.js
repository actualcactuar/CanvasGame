import Player from './player.js';
import GameObject from './gameObject.js';
import Enemy from './enemy.js';
import Star from './star.js';
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
    this.score = 0;
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
    this.enemyWaves = new Set()
      .add([this.spawnPoints.centerRight, this.spawnPoints.topLeft])
      .add([this.spawnPoints.bottomMiddle, this.spawnPoints.bottomLeft])
      .add([
        this.spawnPoints.centerLeft,
        this.spawnPoints.topRight,
        this.spawnPoints.bottomRight,
      ])
      .add([
        this.spawnPoints.bottomLeft,
        this.spawnPoints.topRight,
        this.spawnPoints.bottomRight,
        this.spawnPoints.topMiddle,
      ])
      .values();

    this.subscribe(this.events.GAME_OVER, this.onGameOver.bind(this));
    this.subscribe(this.events.GAME_WON, this.onGameWon.bind(this));
  }

  get currentEnemyWaveDefeated() {
    let waveDefeated = true;
    this.objectPool.forEach((gameObject) => {
      if (gameObject instanceof Enemy) {
        waveDefeated = false;
      }
    });
    return waveDefeated;
  }

  spawnEnemyWave() {
    const { value: wave, done } = this.enemyWaves.next();
    if (done) {
      this.emit(this.events.GAME_WON);
      return;
    }
    wave.forEach((coordinates, index) => {
      const star = new Star(this, 1 / 10, ...coordinates, 7);
      star.follow(this.player);
      star.lookAt(this.player);
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

  start() {
    this.player = new Player(this, 1 / 8, ...this.spawnPoints.centerMiddle, 96);
    this.score = 0;
    this.emit(this.events.UPDATE_HUD);
    this.spawnEnemyWave();
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
