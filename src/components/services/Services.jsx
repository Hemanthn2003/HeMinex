import { useRef } from "react";

import services from "../../data/services";

import CircuitPath from "./CircuitPath";
import ServicePlanet from "./ServicePlanet";

import "./Services.css";

function Services() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="hm-services hm-tech-environment"
      aria-labelledby="services-title"
    >
      {/* ===================================================
          ENVIRONMENT
          =================================================== */}

      <div
        className="hm-atmosphere"
        aria-hidden="true"
      />

      <div
        className="hm-grid hm-grid--fine"
        aria-hidden="true"
      />

      <div
        className="hm-pcb-vignette"
        aria-hidden="true"
      />

      <div
        className="hm-scanlines"
        aria-hidden="true"
      />

      <div
        className="hm-noise"
        aria-hidden="true"
      />

      {/* ===================================================
          HEADER
          =================================================== */}

      <div className="hm-container hm-services__container">
        <header className="hm-section-header hm-services__header">
          <span className="hm-section-eyebrow">
            Our Digital Systems
          </span>

          <h2
            id="services-title"
            className="hm-section-title"
          >
            Four Systems.{" "}
            <span className="hm-gradient-text">
              One Digital Mission.
            </span>
          </h2>

          <p className="hm-section-description">
            We combine engineering, visibility, acquisition
            and branding into one connected digital ecosystem
            built around your business.
          </p>
        </header>
      </div>

      {/* ===================================================
          SERVICE UNIVERSE
          =================================================== */}

      <div className="hm-services__universe">
        <CircuitPath />

        <div
          className="hm-services__stars"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="hm-container hm-services__planets">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={`service-${service.id}`}
              className={`hm-services__planet-slot hm-services__planet-slot--${
                index + 1
              }`}
              data-service-slot={index}
            >
              <ServicePlanet
                service={service}
                index={index}
                active={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================
          SERVICE DETAILS
          =================================================== */}

      <div className="hm-container hm-services__details">
        {services.map((service) => (
          <article
            id={`service-detail-${service.id}`}
            key={service.id}
            className={`hm-service-detail hm-service-detail--${service.accent}`}
          >
            <div className="hm-service-detail__meta">
              <span>
                {service.number}
              </span>

              <span>
                {service.code}
              </span>
            </div>

            <div className="hm-service-detail__content">
              <div className="hm-service-detail__icon">
                <img
                  src={service.icon}
                  alt=""
                />
              </div>

              <div>
                <span className="hm-service-detail__eyebrow">
                  {service.shortTitle}
                </span>

                <h3>
                  {service.name}
                </h3>

                <p>
                  {service.description}
                </p>

                <div className="hm-service-detail__tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hm-service-detail__metrics">
              {service.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="hm-service-detail__metric"
                >
                  <strong>
                    {metric.value}
                  </strong>

                  <span>
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;