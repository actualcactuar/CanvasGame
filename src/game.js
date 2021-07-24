import GameSystem from 'GameSystem';
import Player from 'src/actors/player.js';
import Enemy from 'src/actors/enemy.js';
import Star from 'src/actors/star.js';

export default class Game extends GameSystem {
  /**
   * checks if current wave has been defeated by searching the object pool
   */
  get currentEnemyWaveDefeated() {
    const enemies = this.FindObjectFromPool(
      (gameObject) => gameObject instanceof Enemy
    );
    return !enemies;
  }

  /**
   * @param {number} value value of score to be set
   */
  addScore(value) {
    this.score = this.score + value;
    this.emit(this.events.UPDATE_HUD);
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
