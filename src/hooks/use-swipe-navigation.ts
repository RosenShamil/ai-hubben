"use client";

import { useRef, useCallback } from "react";
import type { PanInfo } from "framer-motion";

interface UseSwipeNavigationOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  velocityThreshold?: number;
}

/**
 * Hook for swipe-based navigation using Framer Motion drag gestures.
 *
 * Returns props to spread onto a `motion.div`:
 *   drag="x", dragConstraints, dragElastic, onDragEnd
 *
 * Buttons remain the primary navigation — swipe is an enhancement.
 */
export function useSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  velocityThreshold = 300,
}: UseSwipeNavigationOptions) {
  const constraintsRef = useRef(null);

  const onDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { offset, velocity } = info;
      const swipedByDistance = Math.abs(offset.x) > threshold;
      const swipedByVelocity = Math.abs(velocity.x) > velocityThreshold;

      if (swipedByDistance || swipedByVelocity) {
        if (offset.x > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      }
    },
    [onSwipeLeft, onSwipeRight, threshold, velocityThreshold]
  );

  return {
    constraintsRef,
    dragProps: {
      drag: "x" as const,
      dragConstraints: { left: 0, right: 0 },
      dragElastic: 0.15,
      onDragEnd,
    },
  };
}
