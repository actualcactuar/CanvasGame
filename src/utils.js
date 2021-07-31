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
/**
 * Crasy implementation due chrome bug rescaling svg viewbox on natural width
 * @param {string} source path to static image asset of game image
 * @returns
 */
export async function createGameImage(source) {
  const response = await fetch(source);
  const blob = await response.blob();
  const [match] = (await blob.text()).match('viewBox=".*?"');
  const image = new Image();

  if (match) {
    const [x, y, width, height] = match
      .split(/viewBox|="|"| /)
      .filter((val) => !!val);

    image.width = width;
    image.height = height;
  }

  image.src = URL.createObjectURL(blob);

  return image;
}

export function getRandomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomCoordinates(canvas) {
  const x = getRandomFromRange(100, canvas.width);
  const y = getRandomFromRange(100, canvas.height);

  return [x, y];
}
