"use client";

import { useEffect, useRef } from "react";

export default function ReadingProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight
        ? Math.min(window.scrollY / scrollableHeight, 1)
        : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${progress})`;
      }
      frame = 0;
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={progressRef}
      aria-hidden="true"
      className="vine-progress fixed right-0 top-0 z-[60] h-dvh w-1 origin-top scale-y-0 bg-primary"
    />
  );
}
