import Nearby from "./nearby.js";

export function Button() {
  const lineEq = (y2, y1, x2, x1, currentVal) => {
    // y = mx + b
    var m = (y2 - y1) / (x2 - x1),
      b = y1 - m * x1;
    return m * currentVal + b;
  };

  const distanceThreshold = { min: 0, max: 100 };
  const grayscaleInterval = { from: 1, to: 0 };
  const bttn = document.querySelector(".iconbutton--border");
  const bttnBorder = bttn.querySelector(".iconbutton__border");
  const borderInterval = { from: 0.1, to: 1 };
  const bttnGraphic = bttn.querySelector(".iconbutton__graphic");
  const bttnText = bttn.querySelector(".iconbutton__text");
  const graphicInterval = { from: 60, to: 0 };
  const textInterval = { from: 0, to: -20 };

  new Nearby(bttn, {
    onProgress: distance => {
      const border = lineEq(
        borderInterval.from,
        borderInterval.to,
        distanceThreshold.max,
        distanceThreshold.min,
        distance
      );
      TweenMax.to(bttnBorder, 0.5, {
        ease: "Expo.easeOut",
        opacity: `${Math.max(
          Math.min(border, borderInterval.to),
          borderInterval.from
        )}`
      });

      const tx = lineEq(
        graphicInterval.from,
        graphicInterval.to,
        distanceThreshold.max,
        distanceThreshold.min,
        distance
      );
      TweenMax.to(bttnGraphic, 0.5, {
        ease: "Expo.easeOut",
        x: `${Math.min(tx, graphicInterval.from)}`
      });

      const txText = lineEq(
        textInterval.from,
        textInterval.to,
        distanceThreshold.max,
        distanceThreshold.min,
        distance
      );
      const bw = lineEq(
        grayscaleInterval.from,
        grayscaleInterval.to,
        distanceThreshold.max,
        distanceThreshold.min,
        distance
      );
      TweenMax.to(bttnText, 0.5, {
        ease: "Expo.easeOut",
        x: `${Math.min(txText, graphicInterval.to)}`,
        filter: `grayscale(${Math.min(bw, grayscaleInterval.from)})`
      });
    }
  });
}
