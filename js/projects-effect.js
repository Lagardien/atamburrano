import charming from "./charming.min.js";
import imagesLoaded from "./imagesloaded.pkgd.min.js";
import Nearby from "./nearby.js";

export function Projects() {
  const lineEq = (y2, y1, x2, x1, currentVal) => {
    // y = mx + b
    var m = (y2 - y1) / (x2 - x1),
      b = y1 - m * x1;
    return m * currentVal + b;
  };
  const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

  const gridItems = Array.from(
    document.querySelectorAll(".grid > .grid__item")
  );
  // whatever we do, start at [distanceThreshold.max]px from the element and end at [distanceThreshold.min]px from the element.
  const distanceThreshold = { min: 0, max: 250 };
  const distanceViewLinkThreshold = { min: 0, max: 100 };
  const grayscaleInterval = { from: 1, to: 0 };
  const blurInterval = { from: 6, to: 0 };
  const scaleInterval = { from: 1.2, to: 1 };
  const opacityInterval = { from: 0, to: 1 };

  gridItems.forEach(item => {
    const img = item.querySelector(".grid__item-img");
    const viewLink = item.querySelector(".grid__item-cta");
    charming(viewLink);
    const viewLinkLetters = Array.from(viewLink.querySelectorAll("span"));
    const lettersTotal = viewLinkLetters.length;
    const lettersPosArr = shuffleArray(Array.from(Array(lettersTotal).keys()));
    let currentVisible = lettersTotal;

    new Nearby(img, {
      onProgress: distance => {
        if (img.classList.contains("grid__item-img--bw")) {
          const bw = lineEq(
            grayscaleInterval.from,
            grayscaleInterval.to,
            distanceThreshold.max,
            distanceThreshold.min,
            distance
          );
          TweenMax.to(img, 1, {
            ease: Power2.easeOut,
            filter: `grayscale(${Math.min(bw, grayscaleInterval.from)})`
          });

          const s = lineEq(
            scaleInterval.from,
            scaleInterval.to,
            distanceThreshold.max,
            distanceThreshold.min,
            distance
          );
          TweenMax.to(img, 1.5, {
            ease: Power2.easeOut,
            scale: Math.min(s, scaleInterval.from)
          });
        }

        const point = lineEq(
          lettersTotal,
          0,
          distanceViewLinkThreshold.max,
          distanceViewLinkThreshold.min,
          distance
        );
        const visible = Math.max(0, Math.min(lettersTotal, Math.floor(point)));
        if (currentVisible != visible) {
          if (visible < currentVisible) {
            for (
              let i = 0, len = lettersPosArr.length - visible;
              i < len;
              ++i
            ) {
              const letter = viewLinkLetters[lettersPosArr[i]];
              if (letter.dataset.state != "hidden") {
                letter.dataset.state = "hidden";
                TweenMax.to(letter, 0.5, {
                  ease: "Expo.easeOut",
                  y: "0%",
                  startAt: { y: "200%" },
                  opacity: 1
                });
              }
            }
          } else {
            for (
              let i = lettersTotal - 1,
                len = lettersTotal - (lettersPosArr.length - visible);
              i >= lettersTotal - len;
              --i
            ) {
              const letter = viewLinkLetters[lettersPosArr[i]];
              if (letter.dataset.state === "hidden") {
                letter.dataset.state = "";
                TweenMax.to(letter, 0.2, {
                  ease: "Expo.easeOut",
                  y: "200%",
                  opacity: 0
                });
              }
            }
          }
          currentVisible = visible;
        }
      }
    });
  });

  // Preload all the images in the page..
  imagesLoaded(
    document.querySelectorAll(".grid__item"),
    { background: true },
    () => document.body.classList.remove("loading")
  );
}
