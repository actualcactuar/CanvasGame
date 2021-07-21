import Game from './modules/game.js';
import { crispCanvas } from './utils.js';

const score = document.getElementById('score');
const canvas = document.getElementById('gamecanvas');
crispCanvas(canvas);

window.onresize = crispCanvas;

const game = new Game(canvas);

const {
  events: { UPDATE_HUD, GAME_OVER },
} = game;

game.subscribe(UPDATE_HUD, () => {
  score.innerText = game.score;
});

game.subscribe(GAME_OVER, () => {
  // @TODO do something on gameover
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
