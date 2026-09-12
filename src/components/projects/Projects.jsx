// src/components/projects/Projects.jsx

import React, { useMemo, useRef } from "react";
import "./Projects.css";
import KitchenFlowImage from "./KitchenFlow.png";
import EcommerceImage from "./EcommerceApp.png";
import MyPortfolioImage from "./MyPortfolio.png";
import LibraryPortalImage from "./LibraryPortal.png";

/* =========================================================
   PROJECT DATA
   ========================================================= */

const projects = [
  {
    id: "01",
    code: "HM-PROJECT-01",
    title: "Advance MERN Full Stack",
    subtitle: "KitchenFlow",
    category: "Restaurant Management Platform",
    description:
      "KitchenFlow is an advanced MERN full-stack restaurant management platform connecting managers, waiters, orders, menus, billing, authentication, and operational workflows. It represents the Advance MERN Full Stack mission by bringing a complete business workflow together in one scalable digital system.",
    technologies: ["MERN", "REST API", "MongoDB", "React"],
    result: "Restaurant Operations",
    status: "ACTIVE",
    type: "FULL-STACK",
    accent: "blue",
    imageClass: "projects__visual--kitchenflow",
    image: KitchenFlowImage,
    link: "https://github.com/Hemanthn2003/kitchenFlow",
    linkType: "github",
  },
  {
    id: "02",
    code: "HM-PROJECT-02",
    title: "Digital Commerce",
    subtitle: "Ecommerce App",
    category: "E-Commerce Experience",
    description:
      "The Ecommerce App is a modern digital shopping experience focused on product discovery, responsive interfaces, smooth customer journeys, and a conversion-ready storefront. It represents Digital Commerce by turning a product catalog into a polished online buying experience.",
    technologies: ["React", "JavaScript", "E-Commerce", "Vercel"],
    result: "Digital Commerce",
    status: "LIVE",
    type: "WEB PLATFORM",
    accent: "cyan",
    imageClass: "projects__visual--commerce",
    image: EcommerceImage,
    link: "https://ecommerce-store-seven-iota.vercel.app/",
    linkType: "live",
  },
  {
    id: "03",
    code: "HM-PROJECT-03",
    title: "Brand Orbit",
    subtitle: "My Portfolio",
    category: "Personal Brand & Digital Identity",
    description:
      "My Portfolio is a personal digital presence designed to present projects, skills, experience, and professional identity through a focused web experience. It represents Brand Orbit by turning a personal profile into a clear, memorable digital brand.",
    technologies: ["React", "UI Design", "Portfolio", "Vercel"],
    result: "Brand Identity",
    status: "LIVE",
    type: "BRANDING",
    accent: "gold",
    imageClass: "projects__visual--brand",
    image: MyPortfolioImage,
    link: "https://my-portfolio-delta-rose-57.vercel.app/",
    linkType: "live",
  },
  {
    id: "04",
    code: "HM-PROJECT-04",
    title: "Growth Engine",
    subtitle: "Library Portal",
    category: "Digital Library Platform",
    description:
      "The Library Portal is a digital platform built to organize and present library resources through a streamlined online experience. It represents Growth Engine by using technology to improve accessibility, structure, discovery, and the overall user journey around information.",
    technologies: ["React", "Web App", "UI Design", "Vercel"],
    result: "Digital Growth",
    status: "LIVE",
    type: "GROWTH",
    accent: "violet",
    imageClass: "projects__visual--growth",
    image: LibraryPortalImage,
    link: "https://library-portal-omega.vercel.app/",
    linkType: "live",
  },
];

/* =========================================================
   PROJECT VISUAL
   ========================================================= */

function ProjectVisual({ project }) {
  return (
    <div className={`projects__visual ${project.imageClass}`}>
      <img
        className="projects__visual-image"
        src={project.image}
        alt={`${project.subtitle} project preview`}
      />

      <div className="projects__visual-image-shade" aria-hidden="true" />
      <div className="projects__visual-grid" aria-hidden="true" />
      <div className="projects__visual-glow" aria-hidden="true" />

      <div className="projects__visual-code projects__visual-code--top">
        <span>SYS</span>
        <strong>{project.id}</strong>
      </div>

      <div className="projects__visual-code projects__visual-code--bottom">
        <span>STATUS</span>
        <strong>{project.status}</strong>
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT CARD
   ========================================================= */

function ProjectCard({ project, index }) {
  return (
    <article
      className={`projects__card projects__card--${project.accent}`}
      data-project-index={index}
      data-project-id={project.id}
    >
      <div className="projects__card-top">
        <div className="projects__card-number">
          <span>{project.code}</span>
          <strong>{project.id}</strong>
        </div>

        <span className="projects__card-status">
          <i />
          {project.status}
        </span>
      </div>

      <ProjectVisual project={project} />

      <div className="projects__card-content">
        <div className="projects__card-category">
          {project.type}
          <span />
          {project.category}
        </div>

        <div className="projects__card-heading">
          <h3 className="projects__card-title">{project.title}</h3>
          <p className="projects__card-subtitle">{project.subtitle}</p>
        </div>

        <p className="projects__card-description">
          {project.description}
        </p>

        <div className="projects__card-tech">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        <div className="projects__card-footer">
          <div className="projects__card-result">
            <span>MISSION</span>
            <strong>{project.result}</strong>
          </div>

          <a
            href={project.link}
            className="projects__card-action"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.subtitle} project`}
          >
            <span>
              {project.linkType === "github" ? "VIEW REPOSITORY" : "VIEW PROJECT"}
            </span>
            <b aria-hidden="true">↗</b>
          </a>
        </div>
      </div>

      <div className="projects__card-corner projects__card-corner--tl" />
      <div className="projects__card-corner projects__card-corner--tr" />
      <div className="projects__card-corner projects__card-corner--bl" />
      <div className="projects__card-corner projects__card-corner--br" />
    </article>
  );
}

/* =========================================================
   PROJECTS COMPONENT
   ========================================================= */

export default function Projects() {
  const projectsRef = useRef(null);

  const projectCount = useMemo(() => {
    return String(projects.length).padStart(2, "0");
  }, []);

  return (
    <section
      ref={projectsRef}
      className="projects"
      id="projects"
      aria-labelledby="projects-title"
    >
      {/* ===================================================
          BACKGROUND SPACE
         =================================================== */}

      <div className="projects__space" aria-hidden="true">
        <div className="projects__stars projects__stars--one" />
        <div className="projects__stars projects__stars--two" />
        <div className="projects__stars projects__stars--three" />

        <div className="projects__nebula projects__nebula--one" />
        <div className="projects__nebula projects__nebula--two" />

        <div className="projects__ambient-orbit projects__ambient-orbit--one" />
        <div className="projects__ambient-orbit projects__ambient-orbit--two" />
      </div>

      {/* ===================================================
          TOP HEADER
         =================================================== */}

      <div className="projects__container">
        <header className="projects__header">
          <div className="projects__eyebrow">
            <span className="projects__eyebrow-line" />

            <span className="projects__eyebrow-text">
              SELECTED WORK
            </span>

            <span className="projects__eyebrow-count">
              {projectCount} MISSIONS
            </span>
          </div>

          <div className="projects__heading-wrap">
            <div className="projects__heading-side">
              <span>HM</span>
              <span>WORK</span>
              <span>LAB</span>
            </div>

            <div className="projects__heading-main">
              <h2 id="projects-title" className="projects__title">
                PROJECT
                <span>ORBIT</span>
              </h2>

              <p className="projects__intro">
                Real-world digital experiences engineered to move
                businesses forward.
              </p>
            </div>
          </div>

          <div className="projects__header-meta">
            <span>EXPLORE OUR</span>
            <strong>DIGITAL MISSIONS</strong>
          </div>
        </header>

        {/* =================================================
            ORBIT STAGE
           ================================================= */}

        <div className="projects__orbit-stage">
          {/* Central orbit system */}
          <div className="projects__orbit-system" aria-hidden="true">
            <span className="projects__orbit-ring projects__orbit-ring--one" />
            <span className="projects__orbit-ring projects__orbit-ring--two" />
            <span className="projects__orbit-ring projects__orbit-ring--three" />

            <span className="projects__orbit-node projects__orbit-node--top" />
            <span className="projects__orbit-node projects__orbit-node--right" />
            <span className="projects__orbit-node projects__orbit-node--bottom" />
            <span className="projects__orbit-node projects__orbit-node--left" />

            <span className="projects__orbit-core">
              <span />
            </span>
          </div>

          {/* =================================================
              CIRCUIT NETWORK
             ================================================= */}

          <svg
            className="projects__circuit"
            viewBox="0 0 1200 1500"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="projectsCircuitGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#1687ff" stopOpacity="0" />
                <stop offset="20%" stopColor="#1687ff" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#21d4fd" stopOpacity="1" />
                <stop offset="80%" stopColor="#d9ad45" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d9ad45" stopOpacity="0" />
              </linearGradient>

              <filter
                id="projectsCircuitGlow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur
                  stdDeviation="4"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              className="projects__circuit-path projects__circuit-path--main"
              d="
                M600 0
                V160
                C600 220 420 220 420 300
                V430
                C420 510 780 510 780 600
                V730
                C780 810 420 810 420 900
                V1030
                C420 1110 780 1110 780 1200
                V1500
              "
              pathLength="1"
            />

            <path
              className="projects__circuit-path projects__circuit-path--branch"
              d="
                M420 300
                H180
                V360
                H100
              "
              pathLength="1"
            />

            <path
              className="projects__circuit-path projects__circuit-path--branch"
              d="
                M780 600
                H1020
                V660
                H1100
              "
              pathLength="1"
            />

            <path
              className="projects__circuit-path projects__circuit-path--branch"
              d="
                M420 900
                H180
                V960
                H100
              "
              pathLength="1"
            />

            <path
              className="projects__circuit-path projects__circuit-path--branch"
              d="
                M780 1200
                H1020
                V1260
                H1100
              "
              pathLength="1"
            />

            <circle
              className="projects__circuit-node"
              cx="420"
              cy="300"
              r="6"
            />

            <circle
              className="projects__circuit-node"
              cx="780"
              cy="600"
              r="6"
            />

            <circle
              className="projects__circuit-node"
              cx="420"
              cy="900"
              r="6"
            />

            <circle
              className="projects__circuit-node"
              cx="780"
              cy="1200"
              r="6"
            />

            <circle
              className="projects__circuit-node projects__circuit-node--branch"
              cx="100"
              cy="360"
              r="4"
            />

            <circle
              className="projects__circuit-node projects__circuit-node--branch"
              cx="1100"
              cy="660"
              r="4"
            />

            <circle
              className="projects__circuit-node projects__circuit-node--branch"
              cx="100"
              cy="960"
              r="4"
            />

            <circle
              className="projects__circuit-node projects__circuit-node--branch"
              cx="1100"
              cy="1260"
              r="4"
            />
          </svg>

          {/* =================================================
              PROJECT CARDS
             ================================================= */}

          <div className="projects__cards">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* =================================================
            BOTTOM MISSION BAR
           ================================================= */}

        <footer className="projects__footer">
          <div className="projects__footer-status">
            <span className="projects__footer-dot" />

            <span>SYSTEM ONLINE</span>

            <i />

            <span>PROJECT DATABASE</span>

            <i />

            <span>HM-2026</span>
          </div>

          <div className="projects__footer-message">
            <span>YOUR NEXT PROJECT</span>
            <strong>COULD BE HERE.</strong>
          </div>

          <a href="#contact" className="projects__footer-action">
            <span>START A MISSION</span>
            <b aria-hidden="true">→</b>
          </a>
        </footer>
      </div>
    </section>
  );
}