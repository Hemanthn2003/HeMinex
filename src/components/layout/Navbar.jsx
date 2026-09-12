import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import logo from "../../assets/brand/heminex-logo.svg";

import "./Navbar.css";


/* =========================================================
   BUSINESS PHONE
   ========================================================= */

const PHONE_NUMBER =
  "+919481420976";


const PHONE_DIAL_URL =
  `tel:${PHONE_NUMBER}`;


/* =========================================================
   NAVIGATION ITEMS
   ========================================================= */

const navigationItems = [
  {
    label: "Home",
    target: "home",
  },
  {
    label: "Services",
    target: "services",
  },
  {
    label: "Process",
    target: "process",
  },
  {
    label: "Projects",
    target: "projects",
  },
  {
    label: "Contact",
    target: "contact",
  },
];


export default function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);


  const menuButtonRef =
    useRef(null);

  const firstMobileLinkRef =
    useRef(null);


  /* =======================================================
     SCROLL STATE
     ======================================================= */

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(
        window.scrollY > 20
      );

    };


    handleScroll();


    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );


    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);


  /* =======================================================
     ESCAPE KEY
     ======================================================= */

  useEffect(() => {

    if (!menuOpen) {
      return;
    }


    const handleKeyDown = (event) => {

      if (event.key === "Escape") {

        event.preventDefault();

        setMenuOpen(false);

      }

    };


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [menuOpen]);


  /* =======================================================
     CLOSE MENU ON DESKTOP
     ======================================================= */

  useEffect(() => {

    const mobileQuery =
      window.matchMedia(
        "(max-width: 767px)"
      );


    const handleMediaChange =
      (event) => {

        if (!event.matches) {

          setMenuOpen(false);

        }

      };


    mobileQuery.addEventListener(
      "change",
      handleMediaChange
    );


    return () => {

      mobileQuery.removeEventListener(
        "change",
        handleMediaChange
      );

    };

  }, []);


  /* =======================================================
     LOCK BODY WHILE MENU IS OPEN
     ======================================================= */

  useEffect(() => {

    const previousOverflow =
      document.body.style.overflow;


    if (menuOpen) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        previousOverflow;

    }


    return () => {

      document.body.style.overflow =
        previousOverflow;

    };

  }, [menuOpen]);


  /* =======================================================
     FOCUS FIRST MOBILE LINK
     ======================================================= */

  useEffect(() => {

    if (!menuOpen) {
      return undefined;
    }


    const timer =
      window.setTimeout(() => {

        firstMobileLinkRef
          .current
          ?.focus();

      }, 50);


    return () => {

      window.clearTimeout(timer);

    };

  }, [menuOpen]);


  /* =======================================================
     CLOSE MENU
     ======================================================= */

  const closeMenu = () => {

    setMenuOpen(false);


    window.setTimeout(() => {

      menuButtonRef
        .current
        ?.focus();

    }, 0);

  };


  /* =======================================================
     SECTION NAVIGATION
     ======================================================= */

  const handleNavigation = (target) => {

    closeMenu();


    const element =
      document.getElementById(target);


    if (!element) {
      return;
    }


    window.setTimeout(() => {

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }, 50);

  };


  /* =======================================================
     DIRECT PHONE CALL
     ======================================================= */

  const handlePhoneClick = (event) => {

    /*
     * Completely stop the click from reaching
     * any parent/global navigation handler.
     */

    event.preventDefault();
    event.stopPropagation();


    /*
     * Directly invoke the phone protocol.
     */

    window.location.href =
      PHONE_DIAL_URL;

  };


  /* =======================================================
     MOBILE BACKDROP
     ======================================================= */

  const handleBackdropClick = () => {

    closeMenu();

  };


  /* =======================================================
     MOBILE FOCUS TRAP
     ======================================================= */

  const handleMobileKeyDown = (event) => {

    if (
      !menuOpen ||
      event.key !== "Tab"
    ) {
      return;
    }


    const mobileNav =
      document.getElementById(
        "hm-mobile-navigation"
      );


    if (!mobileNav) {
      return;
    }


    const focusableElements =
      mobileNav.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex="0"]'
      );


    const focusable =
      Array.from(
        focusableElements
      ).filter(
        (element) =>
          !element.hasAttribute(
            "disabled"
          ) &&
          element.offsetParent !== null
      );


    if (!focusable.length) {
      return;
    }


    const first =
      focusable[0];

    const last =
      focusable[
        focusable.length - 1
      ];


    if (
      event.shiftKey &&
      document.activeElement === first
    ) {

      event.preventDefault();

      last.focus();

      return;

    }


    if (
      !event.shiftKey &&
      document.activeElement === last
    ) {

      event.preventDefault();

      first.focus();

    }

  };


  return (

    <header
      className={`hm-navbar ${
        scrolled
          ? "hm-navbar--scrolled"
          : ""
      } ${
        menuOpen
          ? "hm-navbar--menu-open"
          : ""
      }`}
    >

      <div className="hm-navbar__inner">


        {/* =================================================
            LOGO
            ================================================= */}

        <a
          href="#home"
          className="hm-navbar__brand"
          aria-label="HeMinexTechnology home"
          onClick={(event) => {

            event.preventDefault();

            handleNavigation("home");

          }}
        >

          <img
            src={logo}
            alt="HeMinexTechnology"
            className="hm-navbar__logo"
          />

        </a>


        {/* =================================================
            DESKTOP NAVIGATION
            ================================================= */}

        <nav
          className="hm-navbar__desktop-nav"
          aria-label="Primary navigation"
        >

          {navigationItems.map(
            (item) => (

              <a
                key={item.target}
                href={`#${item.target}`}
                className="hm-navbar__link"
                onClick={(event) => {

                  event.preventDefault();

                  handleNavigation(
                    item.target
                  );

                }}
              >

                <span>
                  {item.label}
                </span>

                <span
                  className="hm-navbar__link-line"
                />

              </a>

            )
          )}

        </nav>


        {/* =================================================
            DESKTOP START A PROJECT
            DIRECT PHONE DIALER
            ================================================= */}

        <a
          href={PHONE_DIAL_URL}
          className="hm-navbar__desktop-action"
          onClick={handlePhoneClick}
          aria-label="Call HeMinexTechnology at 9481420976"
          title="Call +91 9481420976"
        >

          <span>
            Start a Project
          </span>

          <ArrowUpRight
            size={15}
            strokeWidth={1.8}
            aria-hidden="true"
          />

        </a>


        {/* =================================================
            MOBILE MENU BUTTON
            ================================================= */}

        <button
          ref={menuButtonRef}
          type="button"
          className={`hm-navbar__menu-button ${
            menuOpen
              ? "hm-navbar__menu-button--open"
              : ""
          }`}
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="hm-mobile-navigation"
          onClick={() => {

            if (menuOpen) {

              closeMenu();

            } else {

              setMenuOpen(true);

            }

          }}
        >

          <span
            className="hm-navbar__menu-icon"
          >

            {menuOpen ? (

              <X
                size={24}
                strokeWidth={1.6}
                aria-hidden="true"
              />

            ) : (

              <Menu
                size={24}
                strokeWidth={1.6}
                aria-hidden="true"
              />

            )}

          </span>

        </button>

      </div>


      {/* ===================================================
          MOBILE NAVIGATION
          =================================================== */}

      <div
        id="hm-mobile-navigation"
        className={`hm-mobile-nav ${
          menuOpen
            ? "hm-mobile-nav--open"
            : ""
        }`}
        aria-hidden={!menuOpen}
        onKeyDown={handleMobileKeyDown}
      >


        {/* =================================================
            BACKDROP
            ================================================= */}

        <button
          type="button"
          className="hm-mobile-nav__backdrop"
          aria-label="Close navigation menu"
          tabIndex={
            menuOpen
              ? 0
              : -1
          }
          disabled={!menuOpen}
          onClick={
            handleBackdropClick
          }
        />


        {/* =================================================
            MOBILE PANEL
            ================================================= */}

        <nav
          className="hm-mobile-nav__panel"
          aria-label="Mobile navigation"
        >


          <div className="hm-mobile-nav__top">

            <span className="hm-mobile-nav__eyebrow">
              NAVIGATION
            </span>

            <span className="hm-mobile-nav__status">

              <span
                className="hm-mobile-nav__status-dot"
              />

              SYSTEM ONLINE

            </span>

          </div>


          {/* =================================================
              MOBILE LINKS
              ================================================= */}

          <div className="hm-mobile-nav__links">

            {navigationItems.map(
              (item, index) => (

                <a
                  key={item.target}
                  ref={
                    index === 0
                      ? firstMobileLinkRef
                      : undefined
                  }
                  href={`#${item.target}`}
                  className="hm-mobile-nav__link"
                  tabIndex={
                    menuOpen
                      ? 0
                      : -1
                  }
                  onClick={(event) => {

                    event.preventDefault();

                    handleNavigation(
                      item.target
                    );

                  }}
                >

                  <span
                    className="
                      hm-mobile-nav__link-number
                    "
                  >
                    0{index + 1}
                  </span>

                  <span
                    className="
                      hm-mobile-nav__link-label
                    "
                  >
                    {item.label}
                  </span>

                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                </a>

              )
            )}

          </div>


          {/* =================================================
              MOBILE FOOTER
              ================================================= */}

          <div className="hm-mobile-nav__footer">


            {/* ===============================================
                MOBILE START A PROJECT
                DIRECT PHONE DIALER
                =============================================== */}

            <a
              href={PHONE_DIAL_URL}
              className="hm-mobile-nav__cta"
              tabIndex={
                menuOpen
                  ? 0
                  : -1
              }
              onClick={handlePhoneClick}
              aria-label="Call HeMinexTechnology at 9481420976"
              title="Call +91 9481420976"
            >

              <span>
                Start a Project
              </span>

              <ArrowUpRight
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />

            </a>


            <span
              className="
                hm-mobile-nav__footer-code
              "
            >
              HM // DIGITAL SYSTEMS
            </span>

          </div>

        </nav>

      </div>

    </header>
  );
}