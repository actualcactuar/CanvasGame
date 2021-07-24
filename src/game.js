import GameSystem from 'GameSystem';
import Player from 'src/actors/player.js';
import Enemy from 'src/actors/enemy.js';
import Star from 'src/actors/star.js';
console.log('imports');

export default class Game extends GameSystem {
  /**
   * Canvas element where game is rendered
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    super(canvas);
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

  /**
   * @param {number} value value of score to be set
   */
  addScore(value) {
    this.score = this.score + value;
  }

  onInit() {
    this.score = 0;
    this.player = new Player(this, 1 / 8, ...this.spawnPoints.centerMiddle, 96);
    this.addSpawnWave(Enemy, [
      [1 / 10, ...this.spawnPoints.bottomLeft, 8],
      [1 / 10, ...this.spawnPoints.bottomMiddle, 8],
    ]);
    this.addSpawnWave(Enemy, [
      [1 / 10, ...this.spawnPoints.centerRight, 8],
      [1 / 10, ...this.spawnPoints.bottomRight, 8],
    ]);
    this.subscribe(this.events.SPAWN_POOL_EMPTY, () => {
      this.emit(this.events.GAME_WON);
    });
  }

  onStart() {
    this.spawn(this.player);
    this.nextSpawnWave();
  }
}
