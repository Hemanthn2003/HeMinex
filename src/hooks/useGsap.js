import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function useGsap() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    if (!scope.current) return;

    const context = gsap.context(() => {}, scope.current);

    return () => {
      context.revert();
    };
  }, []);

  return scope;
}