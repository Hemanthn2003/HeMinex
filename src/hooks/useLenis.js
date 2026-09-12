// src/components/scroll/CinematicScroll.jsx

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicScroll() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    /*
    =========================================================
    REDUCED MOTION
    =========================================================
    */

    mm.add(
      "(prefers-reduced-motion: reduce)",
      () => {
        /*
         * IMPORTANT:
         *
         * No scrub animations.
         * No large transforms.
         * No planetary movement.
         * No parallax.
         *
         * We keep content visible and accessible.
         */

        gsap.set(
          [
            ".hero__planet",
            ".hero__orbit-system",
            ".hero__content",
            ".hero__atmosphere",
            ".services__header",
            ".service-planet",
            ".service-detail__inner",
          ],
          {
            clearProps: "transform,opacity",
          }
        );

        /*
         * Make sure SVG circuit paths are fully visible.
         */

        const circuitPaths = gsap.utils.toArray(
          ".circuit-path__line"
        );

        circuitPaths.forEach((path) => {
          if (
            typeof path.getTotalLength !== "function"
          ) {
            return;
          }

          const length = path.getTotalLength();

          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: 0,
          });
        });

        /*
         * Refresh because Lenis is disabled in reduced mode.
         */

        requestAnimationFrame(() => {
          ScrollTrigger.refresh(true);
        });
      }
    );

    /*
    =========================================================
    FULL CINEMATIC MOTION
    =========================================================
    */

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        /*
        =====================================================
        HERO
        =====================================================
        */

        const heroPlanet =
          document.querySelector(
            ".hero__planet"
          );

        const heroOrbit =
          document.querySelector(
            ".hero__orbit-system"
          );

        const heroContent =
          document.querySelector(
            ".hero__content"
          );

        const heroAtmosphere =
          document.querySelector(
            ".hero__atmosphere"
          );

        if (heroPlanet) {
          gsap.to(heroPlanet, {
            scale: 1.55,
            y: 220,
            rotate: 18,
            opacity: 0.35,
            ease: "none",

            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          });
        }

        if (heroOrbit) {
          gsap.to(heroOrbit, {
            scale: 1.4,
            rotate: 40,
            opacity: 0.25,
            ease: "none",

            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });
        }

        if (heroContent) {
          gsap.to(heroContent, {
            y: -120,
            opacity: 0,
            ease: "none",

            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "70% top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }

        if (heroAtmosphere) {
          gsap.to(heroAtmosphere, {
            scale: 1.25,
            opacity: 0.2,
            ease: "none",

            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          });
        }

        /*
        =====================================================
        SERVICES HEADER
        =====================================================
        */

        const servicesHeader =
          document.querySelector(
            ".services__header"
          );

        if (servicesHeader) {
          gsap.fromTo(
            servicesHeader,
            {
              y: 100,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              ease: "power3.out",

              scrollTrigger: {
                trigger: ".services",
                start: "top 80%",
                end: "top 45%",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        /*
        =====================================================
        SERVICE PLANETS
        =====================================================
        */

        const planets =
          gsap.utils.toArray(
            ".service-planet"
          );

        planets.forEach((planet, index) => {
          const direction =
            index % 2 === 0 ? -1 : 1;

          gsap.fromTo(
            planet,
            {
              opacity: 0,
              scale: 0.55,
              x: direction * 180,
              y: 120,
              rotate: direction * -15,
            },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotate: 0,
              ease: "power3.out",

              scrollTrigger: {
                trigger: planet,
                start: "top 85%",
                end: "top 45%",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );

          /*
           * Ambient floating motion.
           */

          gsap.to(planet, {
            y: index % 2 === 0 ? -18 : 18,
            x: index % 2 === 0 ? 10 : -10,
            duration: 3 + index * 0.35,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.15,
          });
        });

        /*
        =====================================================
        SERVICE CARDS
        =====================================================
        */

        const cards =
          gsap.utils.toArray(
            ".service-detail"
          );

        cards.forEach((card, index) => {
          const inner =
            card.querySelector(
              ".service-detail__inner"
            );

          if (!inner) return;

          gsap.fromTo(
            inner,
            {
              opacity: 0,
              y: 100,
              scale: 0.94,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "power3.out",

              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                end: "top 45%",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );

          gsap.to(inner, {
            y: index % 2 === 0 ? -25 : 25,
            ease: "none",

            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          });
        });

        /*
        =====================================================
        CIRCUIT PATH
        =====================================================
        */

        const circuitPaths =
          gsap.utils.toArray(
            ".circuit-path__line"
          );

        circuitPaths.forEach((path) => {
          if (
            typeof path.getTotalLength !==
            "function"
          ) {
            return;
          }

          const length =
            path.getTotalLength();

          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",

            scrollTrigger: {
              trigger: ".services",
              start: "top 75%",
              end: "bottom 20%",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          });
        });

        /*
        =====================================================
        FINAL REFRESH
        =====================================================
        */

        requestAnimationFrame(() => {
          ScrollTrigger.refresh(true);
        });
      }
    );

    /*
    =========================================================
    CLEANUP
    =========================================================

    gsap.matchMedia() automatically reverts/kills the
    animations and ScrollTriggers created inside its
    matching blocks.
    */

    return () => {
      mm.revert();
    };
  }, []);

  return null;
}