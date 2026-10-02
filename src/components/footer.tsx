"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [logoText, setLogoText] = useState("Vaibhav");

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
    <footer className="relative w-full py-16 bg-surface-container-lowest border-t border-primary-container/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        <div className="space-y-6">
          <h2 className="font-headline-md text-primary">{logoText}</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Actively working, building, and researching in the tech field. Focused on AI, Agency, LLMs, ML & DL, and system architecture to engineer resilient ecosystems.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/Martian-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="material-symbols-outlined flex size-11 items-center justify-center rounded-full border border-outline-variant text-outline transition-colors hover:border-primary hover:text-primary">terminal</a>
            <a href="https://linkedin.com/in/vaibhav-p-dev" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="material-symbols-outlined flex size-11 items-center justify-center rounded-full border border-outline-variant text-outline transition-colors hover:border-primary hover:text-primary">hub</a>
            <a href="https://www.youtube.com/@_martiandev" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="material-symbols-outlined flex size-11 items-center justify-center rounded-full border border-outline-variant text-outline transition-colors hover:border-primary hover:text-primary">play_circle</a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-label-caps font-label-caps text-primary/60">LINKS_INDEX</h4>
          <ul className="space-y-2">
            <li>
              <a href="https://github.com/Martian-dev" target="_blank" rel="noopener noreferrer" className="text-technical-sm font-technical-sm text-outline hover:text-tertiary transition-colors">GitHub</a>
            </li>
            <li>
              <a href="https://linkedin.com/in/vaibhav-p-dev" target="_blank" rel="noopener noreferrer" className="text-technical-sm font-technical-sm text-outline hover:text-tertiary transition-colors">LinkedIn</a>
            </li>
            <li>
              <a href="https://instagram.com/martian.builds" target="_blank" rel="noopener noreferrer" className="text-technical-sm font-technical-sm text-outline hover:text-tertiary transition-colors">Instagram</a>
            </li>
            <li>
              <a href="https://www.youtube.com/@_martiandev" target="_blank" rel="noopener noreferrer" className="text-technical-sm font-technical-sm text-outline hover:text-tertiary transition-colors">YouTube</a>
            </li>
            <li>
              <a href="https://www.kaggle.com/martian7/code" target="_blank" rel="noopener noreferrer" className="text-technical-sm font-technical-sm text-outline hover:text-tertiary transition-colors">Kaggle</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-label-caps font-label-caps text-primary/60">DIRECT_CHANNEL</h4>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Have an interesting system to build, a technical problem to unpack, or feedback on a note?
          </p>
          <a
            href="https://x.com/martian75007"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 self-start font-label-caps text-label-caps text-secondary transition-colors hover:text-primary"
          >
            START_A_CONVERSATION
            <span aria-hidden="true" className="material-symbols-outlined text-base">arrow_outward</span>
          </a>
          <p className="text-technical-sm font-technical-sm text-outline/50 mt-4 italic opacity-80">
            © 2026 Vaibhav // ALL RIGHTS RESERVED
          </p>
        </div>

      </div>
    </footer>
  );
}
