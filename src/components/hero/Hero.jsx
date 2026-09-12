import {
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";

import pcbBackground from "../../assets/backgrounds/pcb-circuit-background.svg";
import techGrid from "../../assets/backgrounds/tech-grid.svg";
import planetShell from "../../assets/illustrations/digital-planet-shell.svg";

import "./Hero.css";


/* =========================================================
   TECHNOLOGY LABELS
   ========================================================= */

const technologyLabels = [
  {
    label: "MERN",
    className:
      "hm-hero__tech hm-hero__tech--mern",
  },
  {
    label: "SEO",
    className:
      "hm-hero__tech hm-hero__tech--seo",
  },
  {
    label: "LEAD GEN",
    className:
      "hm-hero__tech hm-hero__tech--leads",
  },
  {
    label: "BRANDING",
    className:
      "hm-hero__tech hm-hero__tech--branding",
  },
];


/* =========================================================
   BUSINESS PHONE
   ========================================================= */

const PHONE_NUMBER = "+919481420976";


/* =========================================================
   HERO
   ========================================================= */

function Hero() {


  /* =======================================================
     DIRECT PHONE CALL
     ======================================================= */

  const handleStartProject = (event) => {

    /*
     * Prevent any global/navigation click handler
     * from taking the user to the Contact section.
     */

    event.preventDefault();
    event.stopPropagation();

    window.location.href =
      `tel:${PHONE_NUMBER}`;
  };


  /* =======================================================
     SCROLL TO SERVICES
     ======================================================= */

  const scrollToServices = (event) => {

    event.preventDefault();

    const servicesSection =
      document.querySelector("#services");


    if (servicesSection) {

      servicesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }
  };


  return (
    <section
      id="home"
      className="hm-hero hm-tech-environment"
      aria-labelledby="hero-title"
    >


      {/* ===================================================
          HERO ENVIRONMENT
          =================================================== */}

      <div
        className="hm-atmosphere"
        aria-hidden="true"
      />


      <div
        className="hm-hero__pcb"
        aria-hidden="true"
        style={{
          backgroundImage:
            `url(${pcbBackground})`,
        }}
      />


      <div
        className="hm-hero__grid-image"
        aria-hidden="true"
        style={{
          backgroundImage:
            `url(${techGrid})`,
        }}
      />


      <div
        className="hm-grid hm-grid--large"
        aria-hidden="true"
      />


      <div
        className="hm-grid-perspective"
        aria-hidden="true"
      />


      <div
        className="hm-pcb-vignette"
        aria-hidden="true"
      />


      <div
        className="hm-vignette"
        aria-hidden="true"
      />


      <div
        className="hm-scanlines"
        aria-hidden="true"
      />


      <div
        className="hm-scan-beam"
        aria-hidden="true"
      />


      <div
        className="hm-noise"
        aria-hidden="true"
      />


      {/* ===================================================
          DECORATIVE CORNER DATA
          =================================================== */}

      <div
        className="
          hm-hero__corner
          hm-hero__corner--top-left
        "
        aria-hidden="true"
      >
        <span>
          HM // 001
        </span>

        <span>
          Digital Systems
        </span>
      </div>


      <div
        className="
          hm-hero__corner
          hm-hero__corner--top-right
        "
        aria-hidden="true"
      >
        <span>
          STATUS
        </span>

        <span className="hm-status">
          <span className="hm-status-dot" />
          Online
        </span>
      </div>


      <div
        className="
          hm-hero__corner
          hm-hero__corner--bottom-left
        "
        aria-hidden="true"
      >
        <span>
          BUILD
        </span>

        <span>
          CREATE
        </span>

        <span>
          GROW
        </span>
      </div>


      {/* ===================================================
          MAIN HERO CONTAINER
          =================================================== */}

      <div className="hm-container hm-hero__container">


        {/* =================================================
            HERO CONTENT
            ================================================= */}

        <div className="hm-hero__content">


          {/* =================================================
              EYEBROW
              ================================================= */}

          <div className="hm-hero__eyebrow">

            <span className="hm-hero__eyebrow-line" />

            <span>
              Digital Engineering &amp; Growth Studio
            </span>

            <span className="hm-hero__eyebrow-line" />

          </div>


          {/* =================================================
              TITLE
              ================================================= */}

          <h1
            id="hero-title"
            className="hm-hero__title"
          >

            We Build

            <span className="hm-hero__title-gradient">
              Digital
            </span>

            <span className="hm-hero__title-outline">
              Experiences.
            </span>

          </h1>


          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <p className="hm-hero__description">

            From high-performance MERN applications to
            growth-driven SEO, lead generation and
            unforgettable brand identities — we engineer
            digital experiences designed to move your
            business forward.

          </p>


          {/* =================================================
              ACTIONS
              ================================================= */}

          <div className="hm-hero__actions">


            {/* ===============================================
                START A PROJECT
                DIRECT PHONE DIALER
                =============================================== */}

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="
                hm-button
                hm-button--primary
                hm-button--lg
              "
              onClick={handleStartProject}
              aria-label="Call HeMinexTechnology at 9481420976"
              title="Call +91 9481420976"
            >

              <span>
                Start a Project
              </span>

              <ArrowUpRight
                size={18}
                strokeWidth={2}
                aria-hidden="true"
              />

            </a>


            {/* ===============================================
                EXPLORE SERVICES
                =============================================== */}

            <a
              href="#services"
              className="
                hm-button
                hm-button--outline
                hm-button--lg
              "
              onClick={scrollToServices}
            >

              <span>
                Explore Services
              </span>

              <ArrowDown
                size={17}
                strokeWidth={1.8}
                aria-hidden="true"
              />

            </a>

          </div>


          {/* =================================================
              METRICS
              ================================================= */}

          <div className="hm-hero__metrics">

            <div className="hm-hero__metric">

              <strong>
                04
              </strong>

              <span>
                Core Services
              </span>

            </div>


            <div
              className="hm-hero__metric-divider"
              aria-hidden="true"
            />


            <div className="hm-hero__metric">

              <strong>
                MERN
              </strong>

              <span>
                Full-Stack
              </span>

            </div>


            <div
              className="hm-hero__metric-divider"
              aria-hidden="true"
            />


            <div className="hm-hero__metric">

              <strong>
                ∞
              </strong>

              <span>
                Ideas
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            DIGITAL PLANET VISUAL
            ================================================= */}

        <div
          className="hm-hero__visual"
          aria-hidden="true"
        >

          <div className="hm-hero__visual-glow" />


          {/* ORBITS */}

          <div
            className="
              hm-hero__orbit
              hm-hero__orbit--outer
            "
          />

          <div
            className="
              hm-hero__orbit
              hm-hero__orbit--middle
            "
          />

          <div
            className="
              hm-hero__orbit
              hm-hero__orbit--inner
            "
          />


          {/* PLANET */}

          <div className="hm-hero__planet">

            <div className="hm-hero__planet-glow" />

            <img
              src={planetShell}
              alt=""
              className="hm-hero__planet-image"
            />

            <div className="hm-hero__planet-core">

              <span>
                HM
              </span>

            </div>

          </div>


          {/* TECHNOLOGY LABELS */}

          {technologyLabels.map(
            (technology) => (

              <div
                key={technology.label}
                className={technology.className}
              >

                <span
                  className="hm-hero__tech-dot"
                />

                <span>
                  {technology.label}
                </span>

              </div>

            )
          )}


          {/* VISUAL DATA */}

          <div
            className="
              hm-hero__visual-label
              hm-hero__visual-label--one
            "
          >

            <span>
              SYS.01
            </span>

            <span>
              ENGINEERING
            </span>

          </div>


          <div
            className="
              hm-hero__visual-label
              hm-hero__visual-label--two
            "
          >

            <span>
              SYS.02
            </span>

            <span>
              GROWTH
            </span>

          </div>


          <div
            className="
              hm-focus-ring
              hm-hero__focus-ring
            "
          />

        </div>

      </div>


      {/* ===================================================
          SCROLL INDICATOR
          =================================================== */}

      <a
        href="#services"
        className="hm-hero__scroll"
        onClick={scrollToServices}
        aria-label="Scroll to services"
      >

        <span className="hm-hero__scroll-line">
          <span />
        </span>

        <span className="hm-hero__scroll-text">
          Scroll to explore
        </span>

      </a>

    </section>
  );
}


export default Hero;