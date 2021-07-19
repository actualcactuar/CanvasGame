/**
 *
 * @param {HTMLCanvasElement} canvas
 */
export function crispCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

/**
 *
 * @param {number} degree value between 0-360
 * @returns {number} radian
 */
export function degreesToRadians(degree) {
  return degree * (Math.PI / 180);
}

export function createGameImage(source) {
  const image = new Image();
  image.src = source;
  image.width = image.naturalWidth;
  image.height = image.naturalHeight;
  return image;
}
