import Game from './modules/game.js';
import { crispCanvas } from './utils.js';

const canvas = document.getElementById('gamecanvas');
crispCanvas(canvas);

window.onresize = crispCanvas;

const game = new Game(canvas);

const {
  events: { UPDATE_HUD, GAME_OVER },
} = game;
game.subscribe(UPDATE_HUD, (...args) => {
  console.log(UPDATE_HUD, game.score);
});

game.subscribe(GAME_OVER, (...args) => {
  console.log(GAME_OVER, game.score, game.gameOver);
});

game.onStart = () => {
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
};

canvas.addEventListener(
  'click',
  /**
   *
   * @param {MouseEvent} event
   */
  (event) => {
    game.start(event.clientX, event.clientY);
  },
  { once: true }
);
