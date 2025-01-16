import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./sponsors.css"; // Add your CSS styles here or inline them

gsap.registerPlugin(ScrollTrigger);

const Sponsors = () => {
  useEffect(() => {
    const black = "#0A0A0A";
    const offWhite = "#EDEEE9";

    ScrollTrigger.saveStyles(".first, .second, .cta, .containers");

    ScrollTrigger.matchMedia({
      // Mobile animations
      "(max-width: 768px)": function () {
        const mobileTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".marquee",
            start: "-100% bottom",
            scrub: 1,
          },
        });

        mobileTL
          .to(".first", { duration: 2, xPercent: -100, color: offWhite })
          .to(".second", { duration: 2, xPercent: 100, color: offWhite }, "<")
          .to(".containers", { duration: 0.5, backgroundColor: black }, "<")
          .to(".cta", { duration: 2, color: offWhite }, "<");
      },

      // Tablet and desktop animations
      "(min-width: 769px)": function () {
        const desktopTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".marquee",
            start: "-40% bottom",
            scrub: 7,
            // markers: true,
          },
        });

        desktopTL
          .to(".first", { duration: 2, xPercent: -100 })
          .to(".second", { duration: 2, xPercent: 100 }, "<")
          .to(".containers", { duration: 2 }, "<")
          .to(".cta", { duration: 2 }, "<");
      },
    });
  }, []);

  return (
    <div className="containers">
      <div className="cta">
        <h1 className="title">Scroll Down</h1>
      </div>
      <div className="marquee">
        <div className="marquee__inner first">
          <span>PU is 🔥🔥🔥</span>
          <span>PU is 🔥🔥🔥</span>
          <span>PU is 🔥🔥🔥</span>
          <span>PU is 🔥🔥🔥</span>
        </div>
        <div className="marquee__inner second">
          <span>PU 🚀🚀🚀</span>
          <span>PU 🚀🚀🚀</span>
          <span>PU 🚀🚀🚀</span>
          <span>PU 🚀🚀🚀</span>
        </div>
        <div className="marquee__inner first">
          <span>RED BULL</span>
          <span>RED BULL</span>
          <span>RED BULL</span>
          <span>RED BULL</span>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
