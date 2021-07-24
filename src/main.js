import './main.css';
import Game from '../engine/game.js';
import { crispCanvas } from './utils.js';

const { matches } = window.matchMedia('(any-hover: hover)');
const hasTouchScreen = !matches;
const gameMenu = document.getElementById('gamemenu');
const menuText = document.getElementById('menutext');
const startBtn = document.getElementById('start');
const score = document.getElementById('score');
const canvas = document.getElementById('gamecanvas');
crispCanvas(canvas);

window.onresize = crispCanvas.bind(window, canvas);

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
    gameMenu.style.display = 'block';
    // @TODO do something on gameover
  });
  game.subscribe(GAME_WON, () => {
    menuText.innerText = 'YOU WIN';
    startBtn.innerText = 'RESTART';
    gameMenu.style.display = 'block';
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

  if (hasTouchScreen) {
    /**
     *
     * @param {TouchEvent} event
     */
    canvas.ontouchmove = (event) => {
      event.preventDefault();
      const {
        touches: [move],
      } = event;
      if (game.player) game.player.move(move.clientX, move.clientY);
    };
    canvas.ontouchstart = (event) => {
      event.preventDefault();
      const {
        touches: [move, shoot],
      } = event;
      if (shoot) {
        if (game.player) game.player.shoot();
      }
    };
  }

  game.start();
}

startBtn.onclick = () => {
  startBtn.blur();
  setTimeout(() => {
    gameMenu.style.display = 'none';
    startGame();
  }, 200);
};
