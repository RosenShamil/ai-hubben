"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

const THRESHOLD = 60;

export function PullToRefresh({ children, hardReload = false }: { children: ReactNode; hardReload?: boolean }) {
  const router = useRouter();
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const isPulling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onTouchStart(e: TouchEvent) {
      const scrollTop = el?.scrollTop ?? window.scrollY;
      if (scrollTop <= 1 && !refreshing) {
        startY.current = e.touches[0].clientY;
        isPulling.current = true;
      }
    }

    function onTouchMove(e: TouchEvent) {
      if (!isPulling.current) return;
      const delta = e.touches[0].clientY - startY.current;
      if (delta > 10) {
        e.preventDefault();
        setPullDistance(Math.min(delta * 0.4, THRESHOLD * 1.5));
      } else if (delta < 0) {
        isPulling.current = false;
        setPullDistance(0);
      }
    }

    function onTouchEnd() {
      if (!isPulling.current) return;
      isPulling.current = false;

      const current = containerRef.current?.dataset.pull;
      const dist = current ? parseFloat(current) : 0;

      if (dist >= THRESHOLD) {
        if (hardReload) {
          window.location.reload();
          return;
        }
        setRefreshing(true);
        setPullDistance(THRESHOLD * 0.5);
        router.refresh();
        setTimeout(() => {
          setRefreshing(false);
          setPullDistance(0);
        }, 1500);
      } else {
        setPullDistance(0);
      }
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [refreshing, router]);

  // Store pullDistance in a data attribute so touchend can read latest value
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.dataset.pull = String(pullDistance);
    }
  }, [pullDistance]);

  return (
    <div ref={containerRef} style={{ overscrollBehaviorY: "contain" }}>
      {/* Pull indicator */}
      <div
        className="flex items-center justify-center overflow-hidden"
        style={{
          height: pullDistance > 5 ? `${pullDistance}px` : 0,
          transition: isPulling.current ? "none" : "height 0.3s ease",
        }}
      >
        <RefreshCw
          size={20}
          className="text-muted-foreground"
          style={{
            opacity: Math.min(pullDistance / THRESHOLD, 1),
            transform: `rotate(${pullDistance * 4}deg)`,
            animation: refreshing ? "spin 0.8s linear infinite" : "none",
          }}
        />
      </div>
      {children}
    </div>
  );
}
