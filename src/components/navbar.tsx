"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [logoText, setLogoText] = useState("Vaibhav");
  const isWriting = pathname.startsWith("/blog");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const glitch = () => {
      setLogoText("V@i!h#v");
      timeouts.push(setTimeout(() => setLogoText("Martian"), 100));
      timeouts.push(setTimeout(() => setLogoText("M*rt!@n"), 2000));
      timeouts.push(setTimeout(() => setLogoText("Vaibhav"), 2100));
    };
    const interval = setInterval(() => {
      glitch();
    }, 4000);
    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <nav aria-label="Primary navigation" className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.24)]">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-unit h-20 max-w-container-max mx-auto">
        <Link
          href="/"
          aria-label="Vaibhav — home"
          className="flex min-h-11 w-32 items-center font-headline-md text-headline-md tracking-tighter text-primary"
        >
          {logoText}
        </Link>
        
        <div className="hidden md:flex gap-x-8">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md"
                : "text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-body-md"
            }
          >
            Ecosystem
          </Link>
          {/* Research is a work in progress. Restore this link when the section is ready.
          <Link
            href="/research"
            className={
              pathname === "/research"
                ? "text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md"
                : "text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-body-md"
            }
          >
            Research
          </Link>
          */}
          <Link
            href="/projects"
            className={
              pathname === "/projects"
                ? "text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md"
                : "text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-body-md"
            }
          >
            Artifacts
          </Link>
          <Link
            href="/blog"
            className={
              isWriting
                ? "text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md"
                : "text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-body-md"
            }
          >
            Writing
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://x.com/martian75007"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center rounded-full bg-primary-container px-6 py-2 font-label-caps text-label-caps text-on-primary-container shadow-lg shadow-primary/10 transition-colors duration-200 hover:bg-primary-fixed"
          >
            CONNECT
          </a>
        </div>
      </div>
    </nav>
  );
}
