import Game from './modules/game.js';
import { crispCanvas } from './utils.js';

const canvas = document.getElementById('gamecanvas');
crispCanvas(canvas);

window.onresize = crispCanvas;

const game = new Game(canvas);

game.onstart = () => {
  /**
   *
   * @param {MouseEvent} event
   */
  canvas.onmousemove = (event) => {
    game.player.move(event.clientX, event.clientY);
  };
  /**
   *
   * @param {KeyboardEvent} event
   */
  window.onkeydown = (event) => {
    if (event.code === 'Space') {
      game.player.shoot();
    }
  };
};
/**
 *
 * @param {MouseEvent} event
 * @returns
 */
canvas.onclick = (event) => game.start(event.clientX, event.clientY);
