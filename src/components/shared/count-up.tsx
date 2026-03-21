"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({
  target,
  duration = 2000,
  className = "",
  style,
}: {
  target: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);

  // Parse target: "48 291" -> 48291, preserve format
  const numericStr = target.replace(/\s/g, "");
  const numericVal = parseInt(numericStr, 10);
  const hasSpaces = target.includes(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();

    function format(n: number) {
      const s = Math.round(n).toString();
      if (!hasSpaces) return s;
      // Add spaces as thousand separators
      return s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericVal;
      setDisplay(format(current));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    }

    requestAnimationFrame(tick);
  }, [started, numericVal, target, duration, hasSpaces]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
