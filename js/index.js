/* Loader */

$(window).on("load", function() {
  setTimeout(function() {
    $(".loader-wrapper").fadeOut("slow");
    $("body").removeClass("intro");
  }, 4000);
});

import LazyLinePainter from "./lazy-line-painter-1.9.6.min.js";

(function() {
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      /**
       * Setup your Lazy Line element.
       * see README file for more settings
       */

      let el = document.querySelector("#lbcolor");
      let myAnimation = new LazyLinePainter(el, {
        ease: "easeLinear",
        strokeWidth: 12.1,
        strokeOpacity: 1,
        strokeColor: "#fff",
        strokeCap: "round"
      });
      myAnimation.paint();
    }
  };
})();

/* Projects effect */

import { Projects } from "./projects-effect";
if (document.querySelector(".home")) {
  let projects = Projects();
}

/* Contact form */

import { Contact } from "./contact";

/* Transition */

// Import Highway
import Highway from "@dogstudio/highway";

// Import Transitions
import Fade from "./transition.js";

// Call Highway.Core once.
const H = new Highway.Core({
  transitions: {
    default: Fade
  }
});

// Listen the `NAVIGATE_IN` event
// This event is sent everytime a `data-router-view` is added to the DOM Tree
H.on("NAVIGATE_IN", ({ to, trigger, location }) => {});

// Listen the `NAVIGATE_OUT` event
// This event is sent everytime the `out()` method of a transition is run to hide a `data-router-view`
H.on("NAVIGATE_OUT", ({ from, trigger, location }) => {});

// Listen the `NAVIGATE_END` event
// This event is sent everytime the `done()` method is called in the `in()` method of a transition
H.on("NAVIGATE_END", ({ to, from, trigger, location }) => {
  if (document.querySelector(".home")) {
    let projects = Projects();
  }

  if (document.querySelector(".about")) {
    let contact = Contact();
  }
});
