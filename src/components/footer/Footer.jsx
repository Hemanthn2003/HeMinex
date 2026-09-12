import { ArrowUpRight } from "lucide-react";
import "./Footer.css";

import pcbCircuitBackground from "./pcb-circuit-moving.svg";
import techGrid from "../../assets/backgrounds/tech-grid.svg";
import backToTopIcon from "./back-to-top-neon-animated.svg";

const PHONE_NUMBER = "+919481420976";
const PORTFOLIO_URL = "https://my-portfolio-delta-rose-57.vercel.app/";

const footerLinks = [
  { label: "HOME", href: "#home" },
  { label: "SERVICES", href: "#services" },
  { label: "PROCESS", href: "#process" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export default function Footer() {
  const handleNavClick = (event, href) => {
    if (!href.startsWith("#")) return;

    const target = document.querySelector(href);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", href);
  };

  return (
    <footer className="hm-footer" aria-labelledby="footer-title">
      <div
        className="hm-footer__background hm-footer__background--pcb"
        style={{ backgroundImage: `url(${pcbCircuitBackground})` }}
        aria-hidden="true"
      />

      <div
        className="hm-footer__background hm-footer__background--grid"
        style={{ backgroundImage: `url(${techGrid})` }}
        aria-hidden="true"
      />

      <div className="hm-footer__scanline" aria-hidden="true" />

      <div className="hm-footer__container">
        <div className="hm-footer__navigation">
          <div className="hm-footer__nav-label">
            <span className="hm-footer__nav-line" />
            <span>NAVIGATE</span>
            <span className="hm-footer__nav-line" />
          </div>

          <nav
            className="hm-footer__nav"
            aria-label="Footer navigation"
          >
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hm-footer__nav-link"
                onClick={(event) => handleNavClick(event, link.href)}
              >
                <span>{link.label}</span>
                <i aria-hidden="true" />
              </a>
            ))}

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="hm-footer__nav-link hm-footer__nav-link--project"
              aria-label={`Start a project by calling ${PHONE_NUMBER}`}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight
                size={15}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          </nav>
        </div>

        <div className="hm-footer__divider" aria-hidden="true">
          <span />
          <span>HM // FOOTER NODE</span>
          <span />
        </div>

        <div className="hm-footer__bottom">
          <div className="hm-footer__copyright">
            <span>©</span>
            <span>
              2026 HeMinex Technology. Developed & owned by{" "}
              <a
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hm-footer__owner"
              >
                HeMinex Technology
              </a>
              .
            </span>
          </div>

          <div className="hm-footer__signature" id="footer-title">
            <span>INC // DIGITAL SYSTEMS</span>
            <strong>HEMINEX</strong>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="hm-footer__back-to-top"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        aria-label="Back to top"
        title="Back to top"
      >
        <span className="hm-footer__back-to-top-ring" aria-hidden="true" />
        <img src={backToTopIcon} alt="" aria-hidden="true" />
      </button>
    </footer>
  );
}
