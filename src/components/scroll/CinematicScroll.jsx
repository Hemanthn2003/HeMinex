// src/components/scroll/CinematicScroll.jsx

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
============================================================
HELPERS
============================================================
*/

/**
 * Safely return all elements matching a selector.
 */
const getAll = (selector) => {
  return gsap.utils.toArray(selector);
};

/**
 * Set an SVG path to its fully visible state.
 */
const revealSvgPaths = (selector) => {
  const paths = getAll(selector);

  paths.forEach((path) => {
    if (
      typeof path.getTotalLength !== "function"
    ) {
      return;
    }

    const length =
      path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: 0,
    });
  });
};

/**
 * Create a cinematic draw-on animation for SVG paths.
 */
const animateSvgPaths = ({
  selector,
  trigger,
  start,
  end,
  scrub = 1.5,
}) => {
  if (!trigger) {
    return;
  }

  const paths = getAll(selector);

  paths.forEach((path) => {
    if (
      typeof path.getTotalLength !== "function"
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
        trigger,
        start,
        end,
        scrub,
        invalidateOnRefresh: true,
      },
    });
  });
};

/**
 * Refresh only after React layout, ResizeObserver
 * measurements and browser paint have settled.
 */
const scheduleStableRefresh = () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  });
};

/*
============================================================
MAIN COMPONENT
============================================================
*/

export default function CinematicScroll() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    /*
    ========================================================
    SHARED RESIZE / ORIENTATION REFRESH
    ========================================================
    */

    let refreshTimer = null;

    const handleViewportChange = () => {
      if (refreshTimer) {
        window.clearTimeout(
          refreshTimer
        );
      }

      refreshTimer = window.setTimeout(
        () => {
          ScrollTrigger.refresh();
        },
        120
      );
    };

    window.addEventListener(
      "resize",
      handleViewportChange,
      { passive: true }
    );

    window.addEventListener(
      "orientationchange",
      handleViewportChange,
      { passive: true }
    );

    /*
    ========================================================
    REDUCED MOTION
    ========================================================
    */

    mm.add(
      "(prefers-reduced-motion: reduce)",
      () => {
        /*
        ------------------------------------------------------
        HERO
        ------------------------------------------------------
        */

        gsap.set(
          [
            ".hm-hero",
            ".hm-hero__content",
            ".hm-hero__planet",
            ".hm-hero__visual",
            ".hm-hero__orbit",
            ".hm-hero__visual-glow",
            ".hm-hero__tech",
            ".hm-atmosphere",
          ],
          {
            opacity: 1,
            visibility: "visible",
            clearProps:
              "transform",
          }
        );

        /*
        ------------------------------------------------------
        SERVICES
        ------------------------------------------------------
        */

        gsap.set(
          [
            ".hm-services",
            ".hm-services__header",
            ".hm-service-planet",
            ".hm-service-planet__body",
            ".hm-service-planet__halo",
            ".hm-service-planet__orbit",
            ".hm-service-planet__label",
            ".hm-service-detail",
            ".hm-service-detail__inner",
            ".hm-services__details",
          ],
          {
            opacity: 1,
            visibility: "visible",
            clearProps:
              "transform",
          }
        );

        /*
        Current Services circuit selector.
        */

        revealSvgPaths(
          ".hm-circuit-path__energy"
        );

        /*
        Backwards-compatible fallback in case
        an older circuit remains somewhere.
        */

        revealSvgPaths(
          ".circuit-path__line"
        );

        /*
        ------------------------------------------------------
        PROJECTS
        ------------------------------------------------------
        */

        gsap.set(
          [
            ".projects",
            ".projects__header",
            ".projects__title",
            ".projects__eyebrow",
            ".projects__intro",
            ".projects__orbit-system",
            ".projects__orbit-ring",
            ".projects__orbit-node",
            ".projects__orbit-core",
            ".projects__circuit-path",
            ".projects__circuit-node",
            ".projects__card",
            ".projects__visual",
            ".projects__visual-orbit",
            ".projects__visual-core",
            ".projects__visual-glow",
            ".projects__card-content",
            ".projects__footer",
            ".projects__footer-action",
          ],
          {
            opacity: 1,
            visibility: "visible",
            clearProps:
              "transform",
          }
        );

        /*
        ------------------------------------------------------
        PROCESS
        ------------------------------------------------------
        */

        gsap.set(
          [
            ".process",
            ".process__header",
            "[data-process-node]",
            ".process__footer",
            ".process-circuit__node",
          ],
          {
            opacity: 1,
            visibility: "visible",
            clearProps:
              "transform",
          }
        );

        revealSvgPaths(
          ".process-circuit__line"
        );

        /*
        ------------------------------------------------------
        CONTACT
        ------------------------------------------------------
        */

        gsap.set(
          [
            ".contact",
            ".contact__header",
            ".contact__content",
            ".contact__form",
            ".contact__info",
            ".contact__panel",
            ".contact__cta",
            ".contact__card",
          ],
          {
            opacity: 1,
            visibility: "visible",
            clearProps:
              "transform",
          }
        );

        scheduleStableRefresh();
      }
    );

    /*
    ========================================================
    FULL CINEMATIC MOTION
    ========================================================
    */

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        /*
        ======================================================
        HERO
        ======================================================
        */

        const hero =
          document.querySelector(
            ".hm-hero"
          );

        const heroPlanet =
          document.querySelector(
            ".hm-hero__planet"
          );

        const heroVisual =
          document.querySelector(
            ".hm-hero__visual"
          );

        const heroContent =
          document.querySelector(
            ".hm-hero__content"
          );

        const heroAtmosphere =
          document.querySelector(
            ".hm-atmosphere"
          );

        /*
        ------------------------------------------------------
        HERO PLANET
        ------------------------------------------------------
        */

        if (
          hero &&
          heroPlanet
        ) {
          gsap.to(heroPlanet, {
            scale: 1.55,
            y: 220,
            rotate: 18,
            opacity: 0.35,

            ease: "none",

            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          });
        }

        /*
        ------------------------------------------------------
        HERO VISUAL
        ------------------------------------------------------
        */

        if (
          hero &&
          heroVisual
        ) {
          gsap.to(heroVisual, {
            y: 60,
            scale: 1.04,

            ease: "none",

            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });
        }

        /*
        ------------------------------------------------------
        HERO CONTENT
        ------------------------------------------------------
        */

        if (
          hero &&
          heroContent
        ) {
          gsap.to(heroContent, {
            y: -120,
            opacity: 0,

            ease: "none",

            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "70% top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }

        /*
        ------------------------------------------------------
        HERO ATMOSPHERE
        ------------------------------------------------------
        */

        if (
          hero &&
          heroAtmosphere
        ) {
          gsap.to(heroAtmosphere, {
            scale: 1.2,
            opacity: 0.2,

            ease: "none",

            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          });
        }

        /*
        ------------------------------------------------------
        HERO TECH LABELS
        ------------------------------------------------------
        */

        const heroTechLabels =
          getAll(
            ".hm-hero__tech"
          );

        heroTechLabels.forEach(
          (label, index) => {
            if (!hero) {
              return;
            }

            gsap.to(label, {
              y:
                index % 2 === 0
                  ? -20
                  : 20,

              ease: "none",

              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            });
          }
        );

        /*
        ======================================================
        SERVICES
        ======================================================
        */

        const services =
          document.querySelector(
            ".hm-services"
          ) ||
          document.querySelector(
            ".services"
          );

        /*
        ------------------------------------------------------
        SERVICES HEADER
        ------------------------------------------------------
        */

        const servicesHeader =
          document.querySelector(
            ".hm-services__header"
          ) ||
          document.querySelector(
            ".services__header"
          );

        if (
          services &&
          servicesHeader
        ) {
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
                trigger: services,
                start: "top 80%",
                end: "top 45%",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        /*
        ======================================================
        SERVICE PLANETS
        ======================================================

        IMPORTANT:

        The outer planet receives ONLY scroll transforms.

        The inner body receives ONLY ambient floating motion.

        This prevents GSAP from fighting over the same
        transform properties.
        */

        const servicePlanets =
          getAll(
            ".hm-service-planet"
          );

        servicePlanets.forEach(
          (planet, index) => {
            if (!services) {
              return;
            }

            const direction =
              index % 2 === 0
                ? -1
                : 1;

            /*
            --------------------------------------------------
            SCROLL TRANSFORM
            --------------------------------------------------
            */

            gsap.fromTo(
              planet,
              {
                opacity: 0,
                scale: 0.55,
                x:
                  direction * 180,
                y: 120,
                rotate:
                  direction * -15,
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
            --------------------------------------------------
            AMBIENT FLOAT
            --------------------------------------------------

            Animate the inner visual body instead of the
            outer planet.

            This keeps ambient motion completely separate
            from the ScrollTrigger x/y animation above.
            */

            const planetBody =
              planet.querySelector(
                ".hm-service-planet__body"
              );

            if (planetBody) {
              gsap.to(
                planetBody,
                {
                  y:
                    index % 2 === 0
                      ? -14
                      : 14,

                  x:
                    index % 2 === 0
                      ? 7
                      : -7,

                  duration:
                    3 +
                    index * 0.35,

                  repeat: -1,
                  yoyo: true,

                  ease: "sine.inOut",

                  delay:
                    index * 0.15,
                }
              );
            }
          }
        );

        /*
        ------------------------------------------------------
        SERVICE DETAIL CARDS
        ------------------------------------------------------
        */

        const serviceCards =
          getAll(
            ".hm-service-detail"
          );

        serviceCards.forEach(
          (card, index) => {
            const inner =
              card.querySelector(
                ".hm-service-detail__inner"
              );

            /*
            Some current card versions may not use
            an inner wrapper. In that case animate
            the card itself.
            */

            const target =
              inner || card;

            /*
            ENTRY
            */

            gsap.fromTo(
              target,
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

            /*
            AMBIENT CARD PARALLAX

            Uses the same target but a separate GSAP tween
            with a different scroll range. This is safe
            because both are ScrollTrigger-controlled
            rather than an infinite transform tween.
            */

            gsap.to(target, {
              y:
                index % 2 === 0
                  ? -25
                  : 25,

              ease: "none",

              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
                invalidateOnRefresh: true,
              },
            });
          }
        );

        /*
        ------------------------------------------------------
        SERVICES CIRCUIT
        ------------------------------------------------------
        */

        animateSvgPaths({
          selector:
            ".hm-circuit-path__energy",
          trigger: services,
          start: "top 75%",
          end: "bottom 20%",
          scrub: 1.5,
        });

        /*
        Backwards compatibility for any old circuit path
        still present in the DOM.
        */

        animateSvgPaths({
          selector:
            ".circuit-path__line",
          trigger: services,
          start: "top 75%",
          end: "bottom 20%",
          scrub: 1.5,
        });

        /*
        ======================================================
        PROJECTS
        ======================================================
        */

        const projects =
          document.querySelector(
            ".projects"
          );

        if (projects) {
          /*
          ----------------------------------------------------
          PROJECT HEADER
          ----------------------------------------------------
          */

          const projectsHeader =
            projects.querySelector(
              ".projects__header"
            );

          if (projectsHeader) {
            gsap.fromTo(
              projectsHeader,
              {
                opacity: 0,
                y: 80,
              },
              {
                opacity: 1,
                y: 0,

                ease: "power3.out",

                scrollTrigger: {
                  trigger: projects,
                  start: "top 82%",
                  end: "top 48%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          /*
          ----------------------------------------------------
          PROJECT TITLE
          ----------------------------------------------------
          */

          const projectsTitle =
            projects.querySelector(
              ".projects__title"
            );

          if (projectsTitle) {
            gsap.fromTo(
              projectsTitle,
              {
                opacity: 0,
                y: 55,
              },
              {
                opacity: 1,
                y: 0,

                ease: "power3.out",

                scrollTrigger: {
                  trigger: projectsTitle,
                  start: "top 85%",
                  end: "top 55%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          /*
          ----------------------------------------------------
          PROJECT EYEBROW
          ----------------------------------------------------
          */

          const projectsEyebrow =
            projects.querySelector(
              ".projects__eyebrow"
            );

          if (projectsEyebrow) {
            gsap.fromTo(
              projectsEyebrow,
              {
                opacity: 0,
                x: -35,
              },
              {
                opacity: 1,
                x: 0,

                ease: "power3.out",

                scrollTrigger: {
                  trigger: projectsEyebrow,
                  start: "top 88%",
                  end: "top 60%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          /*
          ----------------------------------------------------
          PROJECT INTRO
          ----------------------------------------------------
          */

          const projectsIntro =
            projects.querySelector(
              ".projects__intro"
            );

          if (projectsIntro) {
            gsap.fromTo(
              projectsIntro,
              {
                opacity: 0,
                y: 35,
              },
              {
                opacity: 1,
                y: 0,

                ease: "power3.out",

                scrollTrigger: {
                  trigger: projectsIntro,
                  start: "top 90%",
                  end: "top 65%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          /*
          ----------------------------------------------------
          PROJECT ORBIT SYSTEM
          ----------------------------------------------------
          */

          const projectOrbit =
            projects.querySelector(
              ".projects__orbit-system"
            );

          if (projectOrbit) {
            gsap.fromTo(
              projectOrbit,
              {
                opacity: 0,
                scale: 0.75,
                rotate: -8,
              },
              {
                opacity: 1,
                scale: 1,
                rotate: 0,

                ease: "power3.out",

                scrollTrigger: {
                  trigger: projectOrbit,
                  start: "top 88%",
                  end: "top 45%",
                  scrub: 1.2,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          /*
          ----------------------------------------------------
          PROJECT ORBIT RING
          ----------------------------------------------------
          */

          const projectOrbitRings =
            getAll(
              ".projects__orbit-ring"
            );

          projectOrbitRings.forEach(
            (ring, index) => {
              gsap.to(ring, {
                rotate:
                  index % 2 === 0
                    ? 18
                    : -18,

                ease: "none",

                scrollTrigger: {
                  trigger: projects,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.5,
                  invalidateOnRefresh: true,
                },
              });
            }
          );

          /*
          ----------------------------------------------------
          PROJECT ORBIT NODES
          ----------------------------------------------------
          */

          const projectOrbitNodes =
            getAll(
              ".projects__orbit-node"
            );

          projectOrbitNodes.forEach(
            (node, index) => {
              gsap.fromTo(
                node,
                {
                  opacity: 0,
                  scale: 0.4,
                },
                {
                  opacity: 1,
                  scale: 1,

                  ease: "power2.out",

                  scrollTrigger: {
                    trigger: node,
                    start: "top 88%",
                    end: "top 60%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          );

          /*
          ----------------------------------------------------
          PROJECT ORBIT CORE
          ----------------------------------------------------
          */

          const projectOrbitCore =
            projects.querySelector(
              ".projects__orbit-core"
            );

          if (projectOrbitCore) {
            gsap.fromTo(
              projectOrbitCore,
              {
                scale: 0.65,
                opacity: 0.4,
              },
              {
                scale: 1,
                opacity: 1,

                ease: "power2.out",

                scrollTrigger: {
                  trigger: projectOrbitCore,
                  start: "top 85%",
                  end: "top 55%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          /*
          ----------------------------------------------------
          PROJECT CIRCUIT PATHS
          ----------------------------------------------------
          */

          animateSvgPaths({
            selector:
              ".projects__circuit-path",
            trigger: projects,
            start: "top 78%",
            end: "bottom 30%",
            scrub: 1.5,
          });

          /*
          ----------------------------------------------------
          PROJECT CIRCUIT NODES
          ----------------------------------------------------
          */

          const projectCircuitNodes =
            getAll(
              ".projects__circuit-node"
            );

          projectCircuitNodes.forEach(
            (node) => {
              gsap.fromTo(
                node,
                {
                  opacity: 0,
                  scale: 0.45,
                },
                {
                  opacity: 1,
                  scale: 1,

                  ease: "power2.out",

                  scrollTrigger: {
                    trigger: node,
                    start: "top 88%",
                    end: "top 58%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          );

          /*
          ----------------------------------------------------
          PROJECT CARDS
          ----------------------------------------------------
          */

          const projectCards =
            getAll(
              ".projects__card"
            );

          projectCards.forEach(
            (card, index) => {
              const direction =
                index % 2 === 0
                  ? -1
                  : 1;

              gsap.fromTo(
                card,
                {
                  opacity: 0,
                  x:
                    direction * 90,
                  y: 55,
                  scale: 0.95,
                },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,

                  ease: "power3.out",

                  scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    end: "top 55%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          );

          /*
          ----------------------------------------------------
          PROJECT VISUALS
          ----------------------------------------------------
          */

          const projectVisuals =
            getAll(
              ".projects__visual"
            );

          projectVisuals.forEach(
            (visual, index) => {
              gsap.to(visual, {
                y:
                  index % 2 === 0
                    ? -18
                    : 18,

                ease: "none",

                scrollTrigger: {
                  trigger: visual,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.4,
                  invalidateOnRefresh: true,
                },
              });
            }
          );

          /*
          ----------------------------------------------------
          PROJECT VISUAL ORBITS
          ----------------------------------------------------
          */

          const visualOrbits =
            getAll(
              ".projects__visual-orbit"
            );

          visualOrbits.forEach(
            (orbit, index) => {
              gsap.to(orbit, {
                rotate:
                  index % 2 === 0
                    ? 22
                    : -22,

                ease: "none",

                scrollTrigger: {
                  trigger: orbit,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.6,
                  invalidateOnRefresh: true,
                },
              });
            }
          );

          /*
          ----------------------------------------------------
          PROJECT VISUAL CORE
          ----------------------------------------------------
          */

          const visualCores =
            getAll(
              ".projects__visual-core"
            );

          visualCores.forEach(
            (core) => {
              gsap.fromTo(
                core,
                {
                  scale: 0.82,
                  opacity: 0.55,
                },
                {
                  scale: 1,
                  opacity: 1,

                  ease: "none",

                  scrollTrigger: {
                    trigger: core,
                    start: "top 90%",
                    end: "top 45%",
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          );

          /*
          ----------------------------------------------------
          PROJECT GLOW
          ----------------------------------------------------
          */

          const projectGlows =
            getAll(
              ".projects__visual-glow"
            );

          projectGlows.forEach(
            (glow) => {
              gsap.to(glow, {
                scale: 1.18,
                opacity: 0.72,

                ease: "none",

                scrollTrigger: {
                  trigger: glow,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.3,
                  invalidateOnRefresh: true,
                },
              });
            }
          );

          /*
          ----------------------------------------------------
          PROJECT CARD CONTENT
          ----------------------------------------------------
          */

          const projectCardContents =
            getAll(
              ".projects__card-content"
            );

          projectCardContents.forEach(
            (content, index) => {
              gsap.fromTo(
                content,
                {
                  opacity: 0,
                  y: 28,
                },
                {
                  opacity: 1,
                  y: 0,

                  ease: "power3.out",

                  scrollTrigger: {
                    trigger: content,
                    start: "top 90%",
                    end: "top 65%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          );

          /*
          ----------------------------------------------------
          PROJECT FOOTER
          ----------------------------------------------------
          */

          const projectFooter =
            projects.querySelector(
              ".projects__footer"
            );

          if (projectFooter) {
            gsap.fromTo(
              projectFooter,
              {
                opacity: 0,
                y: 40,
              },
              {
                opacity: 1,
                y: 0,

                ease: "power2.out",

                scrollTrigger: {
                  trigger: projectFooter,
                  start: "top 90%",
                  end: "top 70%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          /*
          ----------------------------------------------------
          PROJECT FOOTER ACTION
          ----------------------------------------------------
          */

          const projectFooterAction =
            projects.querySelector(
              ".projects__footer-action"
            );

          if (projectFooterAction) {
            gsap.fromTo(
              projectFooterAction,
              {
                opacity: 0,
                scale: 0.9,
              },
              {
                opacity: 1,
                scale: 1,

                ease: "power2.out",

                scrollTrigger: {
                  trigger:
                    projectFooterAction,
                  start: "top 92%",
                  end: "top 72%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          }
        }

        /*
        ======================================================
        PROCESS
        ======================================================
        */

        const process =
          document.querySelector(
            ".process"
          );

        if (process) {
          /*
          ----------------------------------------------------
          PROCESS HEADER
          ----------------------------------------------------
          */

          const processHeader =
            process.querySelector(
              ".process__header"
            );

          if (processHeader) {
            gsap.fromTo(
              processHeader,
              {
                opacity: 0,
                y: 80,
              },
              {
                opacity: 1,
                y: 0,

                ease: "power3.out",

                scrollTrigger: {
                  trigger: process,
                  start: "top 80%",
                  end: "top 45%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          /*
          ----------------------------------------------------
          PROCESS CIRCUIT
          ----------------------------------------------------
          */

          animateSvgPaths({
            selector:
              ".process-circuit__line",
            trigger: process,
            start: "top 70%",
            end: "bottom 75%",
            scrub: 1.5,
          });

          /*
          ----------------------------------------------------
          PROCESS CARDS
          ----------------------------------------------------
          */

          const processNodes =
            getAll(
              "[data-process-node]"
            );

          processNodes.forEach(
            (node, index) => {
              const direction =
                index % 2 === 0
                  ? -1
                  : 1;

              gsap.fromTo(
                node,
                {
                  opacity: 0,
                  x:
                    direction * 100,
                  y: 40,
                },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,

                  ease: "power3.out",

                  scrollTrigger: {
                    trigger: node,
                    start: "top 85%",
                    end: "top 55%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          );

          /*
          ----------------------------------------------------
          PROCESS CIRCUIT NODES
          ----------------------------------------------------
          */

          const processCircuitNodes =
            getAll(
              ".process-circuit__node"
            );

          processCircuitNodes.forEach(
            (node, index) => {
              const correspondingNode =
                processNodes[index];

              if (
                !correspondingNode
              ) {
                return;
              }

              gsap.fromTo(
                node,
                {
                  scale: 0.5,
                  opacity: 0.35,
                },
                {
                  scale: 1.2,
                  opacity: 1,

                  ease: "power2.out",

                  scrollTrigger: {
                    trigger:
                      correspondingNode,
                    start: "top 75%",
                    end: "top 50%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          );

          /*
          ----------------------------------------------------
          PROCESS FOOTER
          ----------------------------------------------------
          */

          const processFooter =
            process.querySelector(
              ".process__footer"
            );

          if (processFooter) {
            gsap.fromTo(
              processFooter,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,

                ease: "power2.out",

                scrollTrigger: {
                  trigger:
                    processFooter,
                  start: "top 90%",
                  end: "top 70%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          }
        }

        /*
        ======================================================
        CONTACT
        ======================================================
        */

        const contact =
          document.querySelector(
            ".contact"
          );

        if (contact) {
          /*
          ----------------------------------------------------
          CONTACT HEADER
          ----------------------------------------------------
          */

          const contactHeader =
            contact.querySelector(
              ".contact__header"
            );

          if (contactHeader) {
            gsap.fromTo(
              contactHeader,
              {
                opacity: 0,
                y: 70,
              },
              {
                opacity: 1,
                y: 0,

                ease: "power3.out",

                scrollTrigger: {
                  trigger: contact,
                  start: "top 82%",
                  end: "top 48%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          /*
          ----------------------------------------------------
          CONTACT CONTENT
          ----------------------------------------------------
          */

          const contactContent =
            getAll(
              ".contact__content"
            );

          contactContent.forEach(
            (content, index) => {
              const direction =
                index % 2 === 0
                  ? -1
                  : 1;

              gsap.fromTo(
                content,
                {
                  opacity: 0,
                  x:
                    direction * 70,
                  y: 35,
                },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,

                  ease: "power3.out",

                  scrollTrigger: {
                    trigger: content,
                    start: "top 88%",
                    end: "top 55%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          );

          /*
          ----------------------------------------------------
          CONTACT FORM
          ----------------------------------------------------
          */

          const contactForms =
            getAll(
              ".contact__form"
            );

          contactForms.forEach(
            (form) => {
              gsap.fromTo(
                form,
                {
                  opacity: 0,
                  y: 55,
                  scale: 0.97,
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,

                  ease: "power3.out",

                  scrollTrigger: {
                    trigger: form,
                    start: "top 88%",
                    end: "top 58%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          );

          /*
          ----------------------------------------------------
          CONTACT INFO
          ----------------------------------------------------
          */

          const contactInfo =
            getAll(
              ".contact__info"
            );

          contactInfo.forEach(
            (info) => {
              gsap.fromTo(
                info,
                {
                  opacity: 0,
                  x: -55,
                },
                {
                  opacity: 1,
                  x: 0,

                  ease: "power3.out",

                  scrollTrigger: {
                    trigger: info,
                    start: "top 88%",
                    end: "top 58%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          );

          /*
          ----------------------------------------------------
          CONTACT PANELS
          ----------------------------------------------------
          */

          const contactPanels =
            getAll(
              ".contact__panel"
            );

          contactPanels.forEach(
            (panel) => {
              gsap.fromTo(
                panel,
                {
                  opacity: 0,
                  y: 45,
                  scale: 0.97,
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,

                  ease: "power3.out",

                  scrollTrigger: {
                    trigger: panel,
                    start: "top 90%",
                    end: "top 62%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          );

          /*
          ----------------------------------------------------
          CONTACT CARDS
          ----------------------------------------------------
          */

          const contactCards =
            getAll(
              ".contact__card"
            );

          contactCards.forEach(
            (card, index) => {
              gsap.fromTo(
                card,
                {
                  opacity: 0,
                  y: 35,
                  scale: 0.96,
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,

                  ease: "power3.out",

                  scrollTrigger: {
                    trigger: card,
                    start: "top 92%",
                    end: "top 68%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          );

          /*
          ----------------------------------------------------
          CONTACT CTA
          ----------------------------------------------------
          */

          const contactCta =
            contact.querySelector(
              ".contact__cta"
            );

          if (contactCta) {
            gsap.fromTo(
              contactCta,
              {
                opacity: 0,
                y: 35,
                scale: 0.94,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,

                ease: "power2.out",

                scrollTrigger: {
                  trigger:
                    contactCta,
                  start: "top 92%",
                  end: "top 70%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          }
        }

        /*
        ======================================================
        FINAL STABLE REFRESH
        ======================================================
        */

        scheduleStableRefresh();
      }
    );

    /*
    ========================================================
    CLEANUP
    ========================================================
    */

    return () => {
      if (refreshTimer) {
        window.clearTimeout(
          refreshTimer
        );
      }

      window.removeEventListener(
        "resize",
        handleViewportChange
      );

      window.removeEventListener(
        "orientationchange",
        handleViewportChange
      );

      mm.revert();

      /*
      Make sure no stale ScrollTriggers remain
      if React remounts this controller.
      */

      ScrollTrigger.getAll().forEach(
        (trigger) => {
          trigger.kill();
        }
      );
    };
  }, []);

  return null;
}