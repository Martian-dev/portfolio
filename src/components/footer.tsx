"use client";

import { useState, useEffect } from "react";

export default function Footer() {
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
    <footer className="relative w-full py-16 bg-surface-container-lowest border-t border-primary-container/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        <div className="space-y-6">
          <h2 className="font-headline-md text-primary">{logoText}</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Actively working, building, and researching in the tech field. Focused on AI, Agency, LLMs, ML & DL, and system architecture to engineer resilient ecosystems.
          </p>
          <div className="flex gap-4">
            <a href="#" className="material-symbols-outlined text-outline hover:text-tertiary transition-all">terminal</a>
            <a href="#" className="material-symbols-outlined text-outline hover:text-tertiary transition-all">hub</a>
            <a href="#" className="material-symbols-outlined text-outline hover:text-tertiary transition-all">database</a>
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
          <h4 className="text-label-caps font-label-caps text-primary/60">MAILING_PROTOCOLS</h4>
          <div className="relative w-full">
            <input 
              type="email" 
              placeholder="ENTER_EMAIL_FOR_UPDATES" 
              className="w-full bg-surface-container-low border-b-2 border-primary/20 focus:border-primary focus:ring-0 text-technical-sm font-technical-sm py-3 transition-all" 
            />
            <button className="absolute right-0 bottom-3 text-primary">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          <p className="text-technical-sm font-technical-sm text-outline/50 mt-4 italic opacity-80">
            © 2024 Vaibhav // ALL RIGHTS RESERVED
          </p>
        </div>

      </div>
    </footer>
  );
}
