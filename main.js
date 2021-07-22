import Game from './modules/game.js';
import { crispCanvas } from './utils.js';

const gameMenu = document.getElementById('gamemenu');
const menuText = document.getElementById('menutext');
const startBtn = document.getElementById('start');
const score = document.getElementById('score');
const canvas = document.getElementById('gamecanvas');
crispCanvas(canvas);

window.onresize = crispCanvas;

function startGame() {
  const game = new Game(canvas);

  const {
    events: { UPDATE_HUD, GAME_OVER, GAME_WON },
  } = game;

  game.subscribe(UPDATE_HUD, () => {
    score.innerText = game.score;
  });

  game.subscribe(GAME_OVER, () => {
    menuText.innerText = 'GAME OVER';
    startBtn.innerText = 'RESTART';
    gameMenu.style.display = 'flex';
    // @TODO do something on gameover
  });
  game.subscribe(GAME_WON, () => {
    menuText.innerText = 'YOU WIN';
    startBtn.innerText = 'RESTART';
    gameMenu.style.display = 'flex';
    console.log('WIN');
    // @TODO do something when game is won
  });

  /**
   *
   * @param {MouseEvent} event
   */
  canvas.onmousemove = (event) => {
    if (game.player) game.player.move(event.clientX, event.clientY);
  };
  /**
   *
   * @param {KeyboardEvent} event
   */
  window.onkeydown = (event) => {
    if (event.code === 'Space' && game.player) {
      game.player.shoot();
    }
  };

  game.start();
}

startBtn.onclick = () => {
  startBtn.blur();
  setTimeout(() => {
    gameMenu.style.display = 'none';
    startGame();
  }, 200);
};
