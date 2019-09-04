import Nearby from "./nearby.js";

export function Scroll() {
  const lineEq = (y2, y1, x2, x1, currentVal) => {
    // y = mx + b
    var m = (y2 - y1) / (x2 - x1),
      b = y1 - m * x1;
    return m * currentVal + b;
  };

  const distanceThreshold = { min: 0, max: 100 };

  const iconWrapperScroll = document.querySelector(".scroll");
  const iconScrollButton = iconWrapperScroll.parentNode;
  const scrollWheel = iconWrapperScroll.querySelector(".scroll__wheel");
  const scrollInterval = { from: 1, to: 15 };

  const tweenScroll = TweenMax.to(scrollWheel, 5, {
    repeat: -1,
    yoyo: false,
    y: 32,
    scaleY: 0,
    paused: true
  });

  let stateScroll = "paused";
  new Nearby(iconScrollButton, {
    onProgress: distance => {
      const time = lineEq(
        scrollInterval.from,
        scrollInterval.to,
        distanceThreshold.max,
        distanceThreshold.min,
        distance
      );
      tweenScroll.timeScale(
        Math.min(Math.max(time, scrollInterval.from), scrollInterval.to)
      );

      if (
        distance < distanceThreshold.max &&
        distance >= distanceThreshold.min &&
        stateScroll !== "running"
      ) {
        tweenScroll.play();
        stateScroll = "running";
      } else if (
        (distance > distanceThreshold.max ||
          distance < distanceThreshold.min) &&
        stateScroll !== "paused"
      ) {
        tweenScroll.pause();
        stateScroll = "paused";
        tweenScroll.time(0);
      }
    }
  });
}
