import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import processSteps from "../../data/process";
import "./Process.css";

/*
============================================================
PROCESS NODE
============================================================
*/

function ProcessNode({
  step,
  index,
  nodeRef,
}) {
  return (
    <article
      ref={nodeRef}
      className={`process-node process-node--${
        index % 2 === 0 ? "left" : "right"
      }`}
      data-process-node
      data-process-index={index}
    >
      {/* ==================================================
          CARD CONNECTOR
          ================================================== */}

      <div className="process-node__connector">
        <span className="process-node__connector-line" />
        <span className="process-node__connector-dot" />
      </div>

      {/* ==================================================
          CARD
          ================================================== */}

      <div className="process-node__card">
        <div className="process-node__top">
          <span className="process-node__code">
            {step.code}
          </span>

          <span className="process-node__number">
            {step.id}
          </span>
        </div>

        <div className="process-node__body">
          <span className="process-node__label">
            {step.label}
          </span>

          <h3>{step.title}</h3>

          <p>{step.description}</p>

          <ul>
            {step.points.map((point) => (
              <li key={point}>
                <span className="process-node__bullet" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="process-node__status">
          <span className="process-node__status-light" />

          SYSTEM STAGE {step.id} / READY
        </div>
      </div>
    </article>
  );
}

/*
============================================================
PROCESS SECTION
============================================================
*/

export default function Process() {
  const processRef = useRef(null);

  const nodeRefs = useRef([]);

  const [circuit, setCircuit] = useState(null);

  /*
  ==========================================================
  BUILD DYNAMIC PCB CIRCUIT
  ==========================================================

  The circuit is NOT based on fixed Y coordinates.

  Instead:

  1. Measure every real Process card.
  2. Find its vertical center.
  3. Calculate the PCB rail position.
  4. Build the SVG path from those coordinates.
  5. Rebuild automatically when the layout changes.
  ==========================================================
  */

  const buildCircuit = useCallback(() => {
    const processElement =
      processRef.current;

    if (!processElement) {
      return;
    }

    const nodes =
      nodeRefs.current.filter(Boolean);

    if (!nodes.length) {
      return;
    }

    const processRect =
      processElement.getBoundingClientRect();

    const processWidth =
      processElement.clientWidth;

    const viewportWidth =
      window.innerWidth;

    /*
    ========================================================
    RESPONSIVE PCB RAIL
    ========================================================

    Desktop:
        rail stays exactly in the center.

    Tablet:
        rail moves toward the left.

    Mobile:
        rail sits closer to the left edge.
    ========================================================
    */

    let railX;

    if (viewportWidth <= 600) {
      railX = 24;
    } else if (viewportWidth <= 900) {
      railX = 34;
    } else {
      railX = processWidth / 2;
    }

    /*
    ========================================================
    MEASURE ACTUAL CARD POSITIONS
    ========================================================
    */

    const points = nodes.map((node) => {
      const rect =
        node.getBoundingClientRect();

      return {
        y:
          rect.top -
          processRect.top +
          rect.height / 2,

        left:
          rect.left -
          processRect.left,

        right:
          rect.right -
          processRect.left,

        width: rect.width,

        height: rect.height,
      };
    });

    /*
    ========================================================
    TIMELINE HEIGHT
    ========================================================
    */

    const topPadding = 40;
    const bottomPadding = 40;

    const lastPoint =
      points[points.length - 1];

    const maxY =
      Math.max(
        processElement.scrollHeight,
        lastPoint.y + bottomPadding
      );

    /*
    ========================================================
    MAIN VERTICAL PCB TRACE
    ========================================================
    */

    const mainPath = [];

    mainPath.push(
      `M ${railX} ${topPadding}`
    );

    points.forEach((point) => {
      mainPath.push(
        `L ${railX} ${point.y}`
      );
    });

    mainPath.push(
      `L ${railX} ${maxY}`
    );

    /*
    ========================================================
    PCB BRANCHES
    ========================================================

    Desktop / laptop:

        CARD       CARD
          \         /
           \       /
            ●─────●
                │
                │
                ●

    Tablet / mobile:

        ●──────── CARD
        │
        ●──────── CARD
        │
        ●──────── CARD

    ========================================================
    */

    const branches = [];

    points.forEach(
      (point, index) => {
        const isCompact =
          viewportWidth <= 900;

        let targetX;

        if (isCompact) {
          /*
          --------------------------------------------------
          COMPACT LAYOUT

          Cards are positioned on the right side
          of the PCB rail.

          Leave a small gap between the PCB
          and card edge.
          --------------------------------------------------
          */

          targetX = Math.max(
            railX + 18,
            point.left - 14
          );
        } else {
          /*
          --------------------------------------------------
          DESKTOP / LAPTOP

          Preserve alternating PCB branches.
          --------------------------------------------------
          */

          const isLeft =
            index % 2 === 0;

          targetX = isLeft
            ? Math.min(
                processWidth - 20,
                point.right + 20
              )
            : Math.max(
                20,
                point.left - 20
              );
        }

        branches.push({
          d: `
            M ${railX} ${point.y}
            L ${targetX} ${point.y}
          `,
          index,
        });
      }
    );

    /*
    ========================================================
    PCB NODE COORDINATES
    ========================================================
    */

    const svgNodes =
      points.map(
        (point, index) => ({
          x: railX,
          y: point.y,
          index,
        })
      );

    /*
    ========================================================
    SAVE CIRCUIT DATA
    ========================================================
    */

    setCircuit({
      width: processWidth,
      height: maxY,
      railX,
      mainPath: mainPath.join(" "),
      branches,
      nodes: svgNodes,
    });
  }, []);

  /*
  ==========================================================
  INITIAL MEASUREMENT
  ==========================================================
  */

  useLayoutEffect(() => {
    let frameOne;
    let frameTwo;

    /*
    First frame:
    wait for React/browser layout.
    */

    frameOne =
      requestAnimationFrame(() => {
        /*
        Second frame:
        allow fonts, layout and nested elements
        another paint cycle.
        */

        frameTwo =
          requestAnimationFrame(() => {
            buildCircuit();
          });
      });

    return () => {
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
    };
  }, [buildCircuit]);

  /*
  ==========================================================
  RESIZE OBSERVER
  ==========================================================

  This catches:

  - Browser resizing
  - Mobile orientation changes
  - Card height changes
  - Text wrapping changes
  - Font/layout changes
  ==========================================================
  */

  useLayoutEffect(() => {
    const processElement =
      processRef.current;

    if (!processElement) {
      return;
    }

    let resizeFrame = null;

    const scheduleMeasurement = () => {
      if (resizeFrame) {
        cancelAnimationFrame(
          resizeFrame
        );
      }

      resizeFrame =
        requestAnimationFrame(() => {
          buildCircuit();
        });
    };

    const observer =
      new ResizeObserver(
        scheduleMeasurement
      );

    /*
    Observe the entire Process section.
    */

    observer.observe(
      processElement
    );

    /*
    Observe every Process card.
    */

    nodeRefs.current
      .filter(Boolean)
      .forEach((node) => {
        observer.observe(node);
      });

    window.addEventListener(
      "resize",
      scheduleMeasurement
    );

    window.addEventListener(
      "orientationchange",
      scheduleMeasurement
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "resize",
        scheduleMeasurement
      );

      window.removeEventListener(
        "orientationchange",
        scheduleMeasurement
      );

      if (resizeFrame) {
        cancelAnimationFrame(
          resizeFrame
        );
      }
    };
  }, [buildCircuit]);

  /*
  ==========================================================
  RENDER
  ==========================================================
  */

  return (
    <section
      ref={processRef}
      id="process"
      className="process"
      aria-labelledby="process-title"
    >
      {/* ==================================================
          BACKGROUND
          ================================================== */}

      <div
        className="process__background"
        aria-hidden="true"
      >
        <div className="process__grid" />
        <div className="process__scanline" />
        <div className="process__noise" />
      </div>

      {/* ==================================================
          MAIN CONTAINER
          ================================================== */}

      <div className="hm-container process__container">

        {/* ==================================================
            HEADER
            ================================================== */}

        <header className="process__header">
          <div className="section-eyebrow">
            <span className="section-eyebrow__line" />

            <span>
              HM / EXECUTION PROTOCOL
            </span>
          </div>

          <div className="process__header-grid">
            <div>
              <h2 id="process-title">
                From{" "}
                <span>Concept</span>
                <br />
                To <strong>Launch.</strong>
              </h2>
            </div>

            <div className="process__intro">
              <p>
                Every project moves through
                a structured digital pipeline
                designed to turn ideas into
                measurable outcomes.
              </p>

              <span className="process__system-status">
                SYSTEM / ONLINE
              </span>
            </div>
          </div>
        </header>

        {/* ==================================================
            DYNAMIC TIMELINE
            ================================================== */}

        <div className="process__timeline">

          {/* ==================================================
              DYNAMIC PCB CIRCUIT
              ================================================== */}

          {circuit && (
            <div
              className="process__circuit"
              aria-hidden="true"
              style={{
                width: `${circuit.width}px`,
                height: `${circuit.height}px`,
              }}
            >
              <svg
                className="process__circuit-svg"
                width={circuit.width}
                height={circuit.height}
                viewBox={`0 0 ${circuit.width} ${circuit.height}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="processCircuitGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgba(80, 180, 255, 0.15)"
                    />

                    <stop
                      offset="50%"
                      stopColor="rgba(90, 210, 255, 0.75)"
                    />

                    <stop
                      offset="100%"
                      stopColor="rgba(80, 180, 255, 0.15)"
                    />
                  </linearGradient>

                  <filter
                    id="processCircuitGlow"
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

                {/* ==================================================
                    MAIN PCB RAIL
                    ================================================== */}

                <path
                  className="
                    process-circuit__line
                    process-circuit__line--main
                  "
                  d={circuit.mainPath}
                />

                {/* ==================================================
                    PCB BRANCHES
                    ================================================== */}

                {circuit.branches.map(
                  (branch) => (
                    <path
                      key={`branch-${branch.index}`}
                      className="
                        process-circuit__line
                        process-circuit__branch
                      "
                      d={branch.d}
                    />
                  )
                )}

                {/* ==================================================
                    PCB NODES
                    ================================================== */}

                {circuit.nodes.map(
                  (node) => (
                    <g
                      key={`node-${node.index}`}
                      className="process-circuit__node"
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="11"
                      />

                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="4"
                      />
                    </g>
                  )
                )}
              </svg>
            </div>
          )}

          {/* ==================================================
              PROCESS CARDS
              ================================================== */}

          <div className="process__nodes">
            {processSteps.map(
              (step, index) => (
                <ProcessNode
                  key={step.id}
                  step={step}
                  index={index}
                  nodeRef={(element) => {
                    nodeRefs.current[index] =
                      element;
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* ==================================================
            FOOTER
            ================================================== */}

        <footer className="process__footer">
          <span>
            HM / PROCESS COMPLETE
          </span>

          <span className="process__footer-line" />

          <span>
            READY FOR NEXT MISSION
          </span>
        </footer>
      </div>
    </section>
  );
}