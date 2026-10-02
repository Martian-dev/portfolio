"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [wordmark, setWordmark] = useState("vaibhav");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const glitch = () => {
      setWordmark("v@!bh#v");
      timeouts.push(setTimeout(() => setWordmark("martian"), 110));
      timeouts.push(setTimeout(() => setWordmark("m*rt!@n"), 1850));
      timeouts.push(setTimeout(() => setWordmark("vaibhav"), 1960));
    };

    timeouts.push(setTimeout(glitch, 2400));
    const interval = setInterval(glitch, 6400);

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed top-0 z-50 w-full border-b border-outline-variant/50 bg-background/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <Link
          href="/"
          aria-label="Vaibhav — home"
          className="group flex min-h-11 items-center gap-3"
        >
          <span
            aria-hidden="true"
            className="size-2.5 rounded-xs bg-primary transition-transform duration-200 group-hover:rotate-45"
          />
          <span className="sr-only">Vaibhav</span>
          <span
            aria-hidden="true"
            className="w-[4.75rem] font-headline-md text-lg font-semibold lowercase tracking-[-0.02em] text-on-background"
          >
            {wordmark}
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-7">
          <Link
            href="/#work"
            className="flex min-h-11 items-center text-sm lowercase text-on-surface-variant transition-colors duration-200 hover:text-primary"
          >
            work
          </Link>
          <Link
            href="/#experience"
            className="flex min-h-11 items-center text-sm lowercase text-on-surface-variant transition-colors duration-200 hover:text-primary"
          >
            experience
          </Link>
          <Link
            href="/#writing"
            className="hidden min-h-11 items-center text-sm lowercase text-on-surface-variant transition-colors duration-200 hover:text-primary sm:flex"
          >
            writing
          </Link>
          <Link
            href="/#links"
            className="hidden min-h-11 items-center text-sm lowercase text-on-surface-variant transition-colors duration-200 hover:text-primary lg:flex"
          >
            links
          </Link>
        </div>
      </div>
    </nav>
  );
}
