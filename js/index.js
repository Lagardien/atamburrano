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

/* CTA button */

import { Button } from "./button";
if (document.querySelector(".page")) {
  let button = Button();
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
const links = document.querySelectorAll("nav a");
// Listen the `NAVIGATE_IN` event
// This event is sent everytime a `data-router-view` is added to the DOM Tree
H.on("NAVIGATE_IN", ({ to, trigger, location }) => {
  // Check Active Link
  for (let i = 0; i < links.length; i++) {
    const link = links[i];

    // Clean class
    link.classList.remove("is-active");

    // Active link
    if (link.href === location.href) {
      link.classList.add("is-active");
    }
  }
});

// Listen the `NAVIGATE_OUT` event
// This event is sent everytime the `out()` method of a transition is run to hide a `data-router-view`
H.on("NAVIGATE_OUT", ({ from, trigger, location }) => {});

// Listen the `NAVIGATE_END` event
// This event is sent everytime the `done()` method is called in the `in()` method of a transition
H.on("NAVIGATE_END", ({ to, from, trigger, location }) => {
  // Check Anchor
  if (location.anchor) {
    // Get element
    const el = document.querySelector(location.anchor);

    if (el) {
      // Scroll to element
      window.scrollTo(el.offsetLeft, el.offsetTop);
    }
  }
  if (document.querySelector(".about")) {
    let contact = Contact();
  }
  if (document.querySelector(".page")) {
    let button = Button();
  }

  if (document.querySelector(".home")) {
    let projects = Projects();
  }
});
