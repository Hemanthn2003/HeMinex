import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function buildVerticalPath(points, railX, height) {
  if (!points.length) {
    return `M ${railX} 0 L ${railX} ${height}`;
  }

  const firstY = Math.max(24, points[0].y);

  let path = `M ${railX} 0 L ${railX} ${firstY}`;

  for (let i = 1; i < points.length; i += 1) {
    const previous = points[i - 1];
    const current = points[i];

    const midpoint =
      previous.y +
      (current.y - previous.y) * 0.5;

    path += ` L ${railX} ${midpoint}`;
    path += ` L ${railX} ${current.y}`;
  }

  path += ` L ${railX} ${height}`;

  return path;
}

function buildDesktopBranches(
  points,
  railX,
  width
) {
  return points.map((point, index) => {
    const isLeft = index % 2 === 0;

    const availableLeft = Math.max(
      railX - 45,
      30
    );

    const availableRight = Math.min(
      width - 30,
      railX + 45
    );

    const targetX = isLeft
      ? clamp(
          point.x - 105,
          30,
          availableLeft
        )
      : clamp(
          point.x + 105,
          availableRight,
          width - 30
        );

    const elbowX = isLeft
      ? Math.min(
          railX - 25,
          targetX + 65
        )
      : Math.max(
          railX + 25,
          targetX - 65
        );

    return {
      id: `desktop-branch-${index}`,
      d: `
        M ${railX} ${point.y}
        L ${elbowX} ${point.y}
        L ${targetX} ${point.y}
      `,
      x: targetX,
      y: point.y,
    };
  });
}

function buildMobileBranches(
  points,
  railX,
  width
) {
  return points.map((point, index) => {
    const targetX = clamp(
      point.x,
      railX + 18,
      width - 18
    );

    const elbowX = Math.min(
      targetX,
      railX + 42
    );

    return {
      id: `mobile-branch-${index}`,
      d: `
        M ${railX} ${point.y}
        L ${elbowX} ${point.y}
        L ${targetX} ${point.y}
      `,
      x: targetX,
      y: point.y,
    };
  });
}

function CircuitPath() {
  const circuitRef = useRef(null);
  const frameRef = useRef(null);

  const [circuit, setCircuit] = useState(null);

  const measureCircuit = useCallback(() => {
    const circuitElement = circuitRef.current;

    if (!circuitElement) {
      return;
    }

    const universe =
      circuitElement.parentElement;

    if (!universe) {
      return;
    }

    const planetContainer =
      universe.querySelector(
        ".hm-services__planets"
      );

    if (!planetContainer) {
      return;
    }

    const slots = Array.from(
      planetContainer.querySelectorAll(
        "[data-service-slot]"
      )
    );

    if (!slots.length) {
      return;
    }

    const universeRect =
      universe.getBoundingClientRect();

    const containerRect =
      planetContainer.getBoundingClientRect();

    const width =
      Math.max(
        1,
        universeRect.width
      );

    const containerLeft =
      containerRect.left -
      universeRect.left;

    const viewportWidth =
      window.innerWidth;

    const compact =
      viewportWidth <= 900;

    /*
      -------------------------------------------------------
      RESPONSIVE RAIL
      -------------------------------------------------------

      Desktop:
        Centered PCB rail.

      Tablet:
        Moves toward the left side.

      Mobile:
        Strong left-side vertical rail.
    */

    let railX;

    if (viewportWidth <= 480) {
      railX = 18;
    } else if (viewportWidth <= 900) {
      railX = 30;
    } else {
      railX = width / 2;
    }

    const points = slots.map(
      (slot, index) => {
        const rect =
          slot.getBoundingClientRect();

        const x =
          rect.left -
          universeRect.left +
          rect.width / 2;

        const y =
          rect.top -
          universeRect.top +
          rect.height / 2;

        return {
          index,
          x,
          y,
          left:
            rect.left -
            universeRect.left,
          right:
            rect.right -
            universeRect.left,
          width: rect.width,
          height: rect.height,
        };
      }
    );

    /*
      Sort by physical position rather than
      assuming the DOM order is always enough.
    */

    points.sort(
      (a, b) => a.y - b.y
    );

    const lastPoint =
      points[points.length - 1];

    const firstPoint =
      points[0];

    const topPadding = compact
      ? 30
      : 45;

    const bottomPadding = compact
      ? 45
      : 70;

    const height = Math.max(
      universe.scrollHeight,
      lastPoint.y +
        lastPoint.height / 2 +
        bottomPadding,
      firstPoint.y +
        topPadding
    );

    /*
      Keep the circuit inside the actual
      universe dimensions.
    */

    const safeRailX = clamp(
      railX,
      12,
      Math.max(12, width - 12)
    );

    const mainPath =
      buildVerticalPath(
        points,
        safeRailX,
        height
      );

    const branches = compact
      ? buildMobileBranches(
          points,
          safeRailX,
          width
        )
      : buildDesktopBranches(
          points,
          safeRailX,
          width
        );

    const nodes = points.map(
      (point) => ({
        x: safeRailX,
        y: point.y,
        index: point.index,
      })
    );

    /*
      Decorative side traces.
      These are independent from the
      actual service connection points.
    */

    const sideTraces = [];

    if (!compact) {
      const traceY1 =
        Math.max(
          80,
          points[0].y - 100
        );

      const traceY2 =
        Math.max(
          traceY1 + 100,
          points[1]?.y - 90 ||
            traceY1 + 200
        );

      const traceY3 =
        Math.max(
          traceY2 + 100,
          points[2]?.y - 90 ||
            traceY2 + 200
        );

      sideTraces.push(
        {
          id: "side-trace-1",
          d: `
            M ${safeRailX} ${traceY1}
            L ${Math.max(
              40,
              safeRailX - 120
            )} ${traceY1}
            L ${Math.max(
              25,
              safeRailX - 170
            )} ${traceY1 + 55}
          `,
        },
        {
          id: "side-trace-2",
          d: `
            M ${safeRailX} ${traceY2}
            L ${Math.min(
              width - 40,
              safeRailX + 120
            )} ${traceY2}
            L ${Math.min(
              width - 25,
              safeRailX + 170
            )} ${traceY2 + 55}
          `,
        },
        {
          id: "side-trace-3",
          d: `
            M ${safeRailX} ${traceY3}
            L ${Math.max(
              40,
              safeRailX - 95
            )} ${traceY3}
            L ${Math.max(
              25,
              safeRailX - 145
            )} ${traceY3 + 50}
          `,
        }
      );
    }

    setCircuit({
      width,
      height,
      railX: safeRailX,
      mainPath,
      branches,
      nodes,
      sideTraces,
      containerLeft,
    });
  }, []);

  useEffect(() => {
    const circuitElement =
      circuitRef.current;

    if (!circuitElement) {
      return undefined;
    }

    const universe =
      circuitElement.parentElement;

    if (!universe) {
      return undefined;
    }

    const planetContainer =
      universe.querySelector(
        ".hm-services__planets"
      );

    if (!planetContainer) {
      return undefined;
    }

    const scheduleMeasure = () => {
      if (frameRef.current) {
        cancelAnimationFrame(
          frameRef.current
        );
      }

      frameRef.current =
        requestAnimationFrame(() => {
          measureCircuit();
          frameRef.current = null;
        });
    };

    /*
      Initial measurement.

      Two frames allow React layout and
      browser image/layout calculations
      to settle before measuring.
    */

    const initialFrame =
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          measureCircuit();
        });
      });

    const resizeObserver =
      new ResizeObserver(() => {
        scheduleMeasure();
      });

    resizeObserver.observe(
      universe
    );

    resizeObserver.observe(
      planetContainer
    );

    const slots =
      planetContainer.querySelectorAll(
        "[data-service-slot]"
      );

    slots.forEach((slot) => {
      resizeObserver.observe(slot);

      const planet =
        slot.querySelector(
          ".hm-service-planet"
        );

      if (planet) {
        resizeObserver.observe(
          planet
        );
      }
    });

    window.addEventListener(
      "resize",
      scheduleMeasure,
      { passive: true }
    );

    window.addEventListener(
      "orientationchange",
      scheduleMeasure,
      { passive: true }
    );

    return () => {
      cancelAnimationFrame(
        initialFrame
      );

      if (frameRef.current) {
        cancelAnimationFrame(
          frameRef.current
        );
      }

      resizeObserver.disconnect();

      window.removeEventListener(
        "resize",
        scheduleMeasure
      );

      window.removeEventListener(
        "orientationchange",
        scheduleMeasure
      );
    };
  }, [measureCircuit]);

  /*
    Refresh once fonts/images/layout have
    had another chance to settle.
  */

  useEffect(() => {
    const handleLoad = () => {
      measureCircuit();
    };

    window.addEventListener(
      "load",
      handleLoad
    );

    return () => {
      window.removeEventListener(
        "load",
        handleLoad
      );
    };
  }, [measureCircuit]);

  if (!circuit) {
    return (
      <div
        ref={circuitRef}
        className="hm-circuit-path"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={circuitRef}
      className="hm-circuit-path"
      aria-hidden="true"
    >
      <svg
        className="hm-circuit-path__svg"
        viewBox={`0 0 ${circuit.width} ${circuit.height}`}
        width={circuit.width}
        height={circuit.height}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="hmCircuitGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#1677ff"
              stopOpacity="0.08"
            />

            <stop
              offset="24%"
              stopColor="#00d9ff"
              stopOpacity="0.8"
            />

            <stop
              offset="50%"
              stopColor="#00d9ff"
              stopOpacity="0.95"
            />

            <stop
              offset="76%"
              stopColor="#d9ad45"
              stopOpacity="0.72"
            />

            <stop
              offset="100%"
              stopColor="#1677ff"
              stopOpacity="0.08"
            />
          </linearGradient>

          <filter
            id="hmCircuitGlow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              stdDeviation="4.5"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="hmCircuitNodeGlow"
            x="-200%"
            y="-200%"
            width="400%"
            height="400%"
          >
            <feGaussianBlur
              stdDeviation="3"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =================================================
            MAIN PCB BASE
            ================================================= */}

        <path
          className="hm-circuit-path__base"
          d={circuit.mainPath}
        />

        {/* =================================================
            GLOWING ENERGY
            ================================================= */}

        <path
          className="hm-circuit-path__energy"
          d={circuit.mainPath}
          filter="url(#hmCircuitGlow)"
        />

        {/* =================================================
            SERVICE BRANCHES
            ================================================= */}

        {circuit.branches.map(
          (branch) => (
            <path
              key={branch.id}
              className="hm-circuit-path__branch"
              d={branch.d}
            />
          )
        )}

        {/* =================================================
            DECORATIVE SIDE TRACES
            ================================================= */}

        {circuit.sideTraces.map(
          (trace) => (
            <path
              key={trace.id}
              className="hm-circuit-path__side-trace"
              d={trace.d}
            />
          )
        )}

        {/* =================================================
            MAIN NODES
            ================================================= */}

        {circuit.nodes.map(
          (node) => (
            <g
              key={`node-${node.index}`}
              className="hm-circuit-path__node-group"
            >
              <circle
                className="hm-circuit-path__node-glow"
                cx={node.x}
                cy={node.y}
                r="11"
              />

              <circle
                className="hm-circuit-path__node"
                cx={node.x}
                cy={node.y}
                r="5.5"
              />

              <circle
                className="hm-circuit-path__node-core"
                cx={node.x}
                cy={node.y}
                r="2"
              />
            </g>
          )
        )}
      </svg>
    </div>
  );
}

export default CircuitPath;