import Game from './modules/game.js';

const canvas = document.getElementById('gamecanvas');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const game = new Game(canvas);

game.onstart = () => {
  /**
   *
   * @param {MouseEvent} event
   */
  canvas.onmousemove = (event) => {
    game.player.move(event.clientX, event.clientY);
  };
};
/**
 *
 * @param {MouseEvent} event
 * @returns
 */
canvas.onclick = (event) => game.start(event.clientX, event.clientY);
