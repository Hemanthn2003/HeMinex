import { ArrowUpRight } from "lucide-react";

function ServicePlanet({ service, index, active = false }) {
  return (
    <article
      className={`hm-service-planet hm-service-planet--${service.accent} ${
        active ? "hm-service-planet--active" : ""
      }`}
      data-service-index={index}
      data-service-id={service.id}
    >
      <div className="hm-service-planet__halo" />

      <div className="hm-service-planet__orbit hm-service-planet__orbit--one" />
      <div className="hm-service-planet__orbit hm-service-planet__orbit--two" />

      <div className="hm-service-planet__body">
        <div className="hm-service-planet__shine" />

        <div className="hm-service-planet__icon">
          <img
            src={service.icon}
            alt=""
          />
        </div>

        <span className="hm-service-planet__number">
          {service.number}
        </span>
      </div>

      <div className="hm-service-planet__connector">
        <span />
      </div>

      <div className="hm-service-planet__label">
        <span className="hm-service-planet__code">
          {service.code}
        </span>

        <h3>
          {service.title}
        </h3>

        <span className="hm-service-planet__name">
          {service.name}
        </span>
      </div>

      <a
         href={`#service-detail-${service.id}`}
        className="hm-service-planet__action"
        aria-label={`Explore ${service.name}`}
      >
        <ArrowUpRight
          size={16}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </a>
    </article>
  );
}

export default ServicePlanet;