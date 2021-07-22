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
