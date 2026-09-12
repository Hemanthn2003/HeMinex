import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { useState } from "react";

import "./Contact.css";


/* =========================================================
   BUSINESS CONTACT DETAILS
   ========================================================= */

const BUSINESS_EMAIL =
  "heminextechnologies@gmail.com";

const BUSINESS_PHONE =
  "+919481420976";

const WHATSAPP_NUMBER =
  "919481420976";


/* =========================================================
   WHATSAPP MESSAGE BUILDER
   ========================================================= */

function buildWhatsAppMessage({
  name,
  email,
  service,
  projectDetails,
}) {
  return `Hello HeMinexTechnology,

I would like to discuss a project.

Name: ${name}
Email: ${email}
Service: ${service}
Project Details: ${projectDetails}

Please get back to me regarding this project.`;
}


export default function Contact() {

  /* =======================================================
     FORM STATE
     ======================================================= */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    projectDetails: "",
  });


  const [isSending, setIsSending] =
    useState(false);


  /* =======================================================
     INPUT HANDLER
     ======================================================= */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };


  /* =======================================================
     WHATSAPP SUBMISSION
     ======================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    const name =
      formData.name.trim();

    const email =
      formData.email.trim();

    const service =
      formData.service.trim();

    const projectDetails =
      formData.projectDetails.trim();


    /* -----------------------------------------------
       Browser validation fallback
       ----------------------------------------------- */

    if (
      !name ||
      !email ||
      !service ||
      !projectDetails
    ) {
      return;
    }


    setIsSending(true);


    /* -----------------------------------------------
       Build WhatsApp message
       ----------------------------------------------- */

    const message =
      buildWhatsAppMessage({
        name,
        email,
        service,
        projectDetails,
      });


    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`;


    /*
     * Small delay allows the button state to render
     * before redirecting to WhatsApp.
     */

    window.setTimeout(() => {
      window.location.href =
        whatsappUrl;
    }, 180);
  };


  return (
    <section
      id="contact"
      className="contact"
      aria-labelledby="contact-title"
    >

      {/* ==================================================
          HEADER
          ================================================== */}

      <div className="contact__header">

        <div className="contact__eyebrow">

          <span className="contact__eyebrow-line" />

          LET'S CONNECT

          <span className="contact__eyebrow-line" />

        </div>


        <h2
          id="contact-title"
          className="contact__title"
        >
          Ready to turn your
          <span>
            idea into reality?
          </span>
        </h2>


        <p className="contact__intro">
          Tell us what you're building,
          what you're trying to achieve,
          or where you're stuck.
          We'll help you find the right
          digital path.
        </p>

      </div>


      {/* ==================================================
          CONTENT
          ================================================== */}

      <div className="contact__content">


        {/* =================================================
            CONTACT INFORMATION
            ================================================= */}

        <div className="contact__info">

          <div className="contact__panel">

            <span className="contact__panel-kicker">
              HM // CONTACT NODE
            </span>


            <h3>
              Let's build something
              <span>
                meaningful.
              </span>
            </h3>


            <p>
              From high-performance web
              applications to growth-focused
              digital strategies, we're ready
              to work with you.
            </p>


            <div className="contact__details">


              {/* ==========================================
                  EMAIL
                  ========================================== */}

              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="contact__detail"
                aria-label={`Email HeMinexTechnology at ${BUSINESS_EMAIL}`}
              >

                <span className="contact__detail-icon">

                  <Mail
                    size={17}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                </span>


                <span>

                  <small>
                    EMAIL
                  </small>

                  {BUSINESS_EMAIL}

                </span>

              </a>


              {/* ==========================================
                  PHONE
                  ========================================== */}

              <a
                href={`tel:${BUSINESS_PHONE}`}
                className="contact__detail"
                aria-label={`Call HeMinexTechnology at +91 94814 20976`}
              >

                <span className="contact__detail-icon">

                  <Phone
                    size={17}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                </span>


                <span>

                  <small>
                    PHONE
                  </small>

                  +91 94814 20976

                </span>

              </a>


              {/* ==========================================
                  LOCATION
                  ========================================== */}

              <div className="contact__detail">

                <span className="contact__detail-icon">

                  <MapPin
                    size={17}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                </span>


                <span>

                  <small>
                    LOCATION
                  </small>

                  Bengaluru, India

                </span>

              </div>


              {/* ==========================================
                  WORLDWIDE
                  ========================================== */}

              <div className="contact__detail">

                <span className="contact__detail-icon">

                  <MapPin
                    size={17}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                </span>


                <span>

                  <small>
                    AVAILABILITY
                  </small>

                  Working Worldwide

                </span>

              </div>

            </div>

          </div>


          {/* =================================================
              STATUS
              ================================================= */}

          <div className="contact__status">

            <span className="contact__status-dot" />

            <span>
              AVAILABLE FOR NEW PROJECTS
            </span>

          </div>

        </div>


        {/* =================================================
            FORM
            ================================================= */}

        <div className="contact__form-wrap">

          <div className="contact__form-head">

            <span>
              01
            </span>


            <div>

              <small>
                PROJECT INQUIRY
              </small>

              <h3>
                Start a conversation
              </h3>

            </div>

          </div>


          <form
            className="contact__form"
            onSubmit={handleSubmit}
          >


            {/* ============================================
                NAME + EMAIL
                ============================================ */}

            <div className="contact__field-row">


              {/* NAME */}

              <label className="contact__field">

                <span>
                  Name
                </span>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />

              </label>


              {/* EMAIL */}

              <label className="contact__field">

                <span>
                  Email
                </span>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />

              </label>

            </div>


            {/* ============================================
                SERVICE
                ============================================ */}

            <label className="contact__field">

              <span>
                What do you need?
              </span>


              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >

                <option
                  value=""
                  disabled
                >
                  Select a service
                </option>


                <option value="MERN Full-Stack Development">
                  MERN Full-Stack Development
                </option>


                <option value="SEO & Backlinks">
                  SEO & Backlinks
                </option>


                <option value="Lead Generation">
                  Lead Generation
                </option>


                <option value="Logo & Branding">
                  Logo & Branding
                </option>


                <option value="Something Else">
                  Something Else
                </option>

              </select>

            </label>


            {/* ============================================
                PROJECT DETAILS
                ============================================ */}

            <label className="contact__field">

              <span>
                Project details
              </span>


              <textarea
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleChange}
                rows="6"
                placeholder="Tell us about your project, goals and timeline..."
                required
              />

            </label>


            {/* ============================================
                WHATSAPP SUBMIT
                ============================================ */}

            <button
              type="submit"
              className="contact__cta"
              disabled={isSending}
              aria-label="Send project enquiry through WhatsApp"
            >

              <span>
                {isSending
                  ? "Opening WhatsApp..."
                  : "Send Project Enquiry"}
              </span>


              <ArrowUpRight
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
              />

            </button>

          </form>

        </div>

      </div>


      {/* ==================================================
          FOOTER MARK
          ================================================== */}

      <div className="contact__footer">

        <span>
          HM // IDEAS
        </span>

        <span>
          CODE
        </span>

        <span>
          GROWTH
        </span>

      </div>

    </section>
  );
}