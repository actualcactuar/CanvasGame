import Game from './modules/game.js';

const canvas = document.getElementById('gamecanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

canvas.onclick = () => game.start();
