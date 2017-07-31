import geom from './geom';
import { first, last, minBy, maxBy, some, isNull, values } from 'lodash';

export function getImageAreas(imageUrl, canvasWidth, canvasHeight, numTemplateAreas) {
  return new Promise((resolve) => {

    let templateImage = new Image();
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let imgData;
    let data;
    let points = [];
    let areas = [];
    let area;

    const getNonTransparentCanvasArea = () => {
      let pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      let l = pixels.data.length;
      let bound = {
        top: null,
        left: null,
        right: null,
        bottom: null
      };
      let x;
      let y;
      for (let i = 0; i < l; i += 4) {
        if (pixels.data[i+3] !== 0) {
          x = (i / 4) % canvasWidth;
          y = ~~((i / 4) / canvasHeight);

          if (bound.top === null) {
            bound.top = y;
          }

          if (bound.left === null) {
            bound.left = x;
          } else if (x < bound.left) {
            bound.left = x;
          }

          if (bound.right === null) {
            bound.right = x;
          } else if (bound.right < x) {
            bound.right = x;
          }

          if (bound.bottom === null) {
            bound.bottom = y;
          } else if (bound.bottom < y) {
            bound.bottom = y;
          }
        }
      }

      bound.bottom += 1;
      bound.right += 1;

      if (some(values(bound), isNull)) {
        return false;
      }

      return bound;
    };

    const defineNonTransparent = (x, y) => {
      let a = data[(y * canvasWidth + x) * 4 + 3];
      return (a > 20);
    };

    const findNextArea = () => {
      imgData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      data = imgData.data;
      points = geom.contour(defineNonTransparent);

      if (points.length === 0) {
        return false;
      }

      let x1 = first(minBy(points, '0'));
      let y1 = last(minBy(points, '1'));
      let x2 = first(maxBy(points, '0'));
      let y2 = last(maxBy(points, '1'));

      let width = x2 - x1;
      let height = y2 - y1;

      return {
        x: x1,
        y: y1,
        width: width,
        height: height
      };
    };

    templateImage.onload = () => {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.drawImage(templateImage, 0, 0, canvasWidth, canvasHeight);

      let boundary = getNonTransparentCanvasArea();
      let maxX = boundary.right;
      let maxY = boundary.bottom;

      while(boundary !== false && boundary.right <= maxX && boundary.bottom <= maxY && areas.length < numTemplateAreas) {
        area = findNextArea(0, 0, canvasWidth, canvasHeight);

        if (area) {
          areas.push(area);
          ctx.clearRect(area.x, area.y, area.width, area.height);
        }

        boundary = getNonTransparentCanvasArea();
      }
    };
    templateImage.src = imageUrl;

    resolve(areas);

  });
}

export function getPixel(imageDataData, width, x, y) {
  let out = {};
  let index = ~~(x + (y * width));
  index *= 4;

  out.r = imageDataData[index];
  out.g = imageDataData[++index];
  out.b = imageDataData[++index];
  out.a = imageDataData[++index];

  return out;
}

export function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
