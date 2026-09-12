import "./FloatingContacts.css";

import whatsappIcon from "./whatsapp-neon-animated.svg";
import callIcon from "./call-neon-animated.svg";

const PHONE_NUMBER = "+919481420976";

const WHATSAPP_MESSAGE =
  "Hello, I am interested in building my project with you. Can we discuss?";

const whatsappUrl = `https://wa.me/${PHONE_NUMBER.replace(
  /\D/g,
  ""
)}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const callUrl = `tel:${PHONE_NUMBER}`;

export default function FloatingContacts() {
  return (
    <aside
      className="floating-contacts"
      aria-label="Contact HeMinexTechnology"
    >
      {/* =====================================================
          WHATSAPP
          ===================================================== */}
      <a
        className="floating-contact floating-contact--whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with HeMinexTechnology on WhatsApp. Opens WhatsApp in a new tab."
        title="Chat with us on WhatsApp"
      >
        <span
          className="floating-contact__orbit floating-contact__orbit--one"
          aria-hidden="true"
        />

        <span
          className="floating-contact__orbit floating-contact__orbit--two"
          aria-hidden="true"
        />

        <span
          className="floating-contact__pulse"
          aria-hidden="true"
        />

        <span className="floating-contact__icon" aria-hidden="true">
          <img
            src={whatsappIcon}
            alt=""
          />
        </span>

        <span className="floating-contact__tooltip" aria-hidden="true">
          <strong>Chat on WhatsApp</strong>
          <span>Let's discuss your project</span>
        </span>
      </a>

      {/* =====================================================
          CALL
          ===================================================== */}
      <a
        className="floating-contact floating-contact--call"
        href={callUrl}
        aria-label={`Call HeMinexTechnology at ${PHONE_NUMBER}`}
        title={`Call ${PHONE_NUMBER}`}
      >
        <span
          className="floating-contact__orbit floating-contact__orbit--one"
          aria-hidden="true"
        />

        <span
          className="floating-contact__orbit floating-contact__orbit--two"
          aria-hidden="true"
        />

        <span
          className="floating-contact__pulse"
          aria-hidden="true"
        />

        <span className="floating-contact__icon" aria-hidden="true">
          <img
            src={callIcon}
            alt=""
          />
        </span>

        <span className="floating-contact__tooltip" aria-hidden="true">
          <strong>Call Us</strong>
          <span>{PHONE_NUMBER}</span>
        </span>
      </a>
    </aside>
  );
}