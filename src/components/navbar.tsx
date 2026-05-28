"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [logoText, setLogoText] = useState("Vaibhav");

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoText("V@i!h#v");
      setTimeout(() => setLogoText("Martian"), 100);
      setTimeout(() => setLogoText("M*rt!@n"), 2000);
      setTimeout(() => setLogoText("Vaibhav"), 2100);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,20,0,0.6)]">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-unit h-20 max-w-container-max mx-auto">
        <div className="font-headline-md text-headline-md tracking-tighter text-primary w-32">
          {logoText}
        </div>
        
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
              pathname === "/blog"
                ? "text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md"
                : "text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-body-md"
            }
          >
            Signals
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-label-caps text-label-caps hover:backdrop-blur-3xl hover:bg-surface-container-high/50 transition-all duration-500 scale-95 active:scale-90 shadow-lg shadow-primary/20">
            CONNECT
          </button>
        </div>
      </div>
    </nav>
  );
}
