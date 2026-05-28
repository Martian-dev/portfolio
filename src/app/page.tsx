"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const cards = document.querySelectorAll(".glass-card");
    const handler = (card: Element) => (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    };
    const handlers = Array.from(cards).map((card) => {
      const h = handler(card);
      card.addEventListener("mousemove", h);
      return { card, h };
    });
    return () =>
      handlers.forEach(({ card, h }) =>
        card.removeEventListener("mousemove", h)
      );
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex flex-col items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJt5ZR3Jpoy-xdokNEXqrhNEhsg1kqiQijWh-6SBPoPNIr_MPllvzb9CSnRwsSRAZF41zp_M8PGQPFRZbZf9mQBNZF-Z9mnDOii9_6ctjxX3wEID1ZIYMR3IEZYMWRUlkLdAnxuDKU7gFUyqdsw7ps3oHRYxGWOtyCB9Srf-E9OftMz1BOsNWkVhpEmhGfnsooJavHDTGEohWXJ9UvJcTP-PlnjWhFuTanT4nrTWF6kUe4rFCP6QlJ_QCvzE6v_jXyLCM4O0cKRWAB"
              alt="Lush Forest"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
            <div className="absolute inset-0 scanline overflow-hidden">
              <div
                className="absolute inset-0 w-full h-[2px] bg-primary/20 shadow-[0_0_15px_rgba(107,251,154,0.5)] opacity-50"
                style={{ animation: "scanline-beam 8s linear infinite" }}
              />
            </div>
          </div>

          {/* Terminal content */}
          <div className="relative z-10 w-full max-w-5xl">
            <div className="glass-card p-1 lg:p-2 rounded-2xl overflow-hidden shadow-2xl border border-primary/20">
              <div className="bg-surface-container-lowest/80 rounded-xl p-8 md:p-12 border border-white/5 relative">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-12 border-b border-primary/10 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-error/50" />
                    <div className="w-3 h-3 rounded-full bg-secondary/50" />
                    <div className="w-3 h-3 rounded-full bg-primary/50" />
                  </div>
                  <div className="text-technical-sm font-technical-sm text-primary/60 tracking-widest">
                    SECURE_CONNECTION
                  </div>
                </div>

                {/* Headline area */}
                <div className="space-y-6">
                  <div className="text-label-caps font-label-caps text-secondary tracking-[0.3em]">
                    SYSTEMS INITIALIZED
                  </div>
                  <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-on-background leading-none max-w-4xl">
                    APPLIED AI //{" "}
                    <span className="text-primary text-glow italic">
                      SYSTEMS ARCHITECTURE
                    </span>
                  </h1>
                  <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                    Actively working, building, and researching in the tech field. Focused on AI, Agency, LLMs, ML & DL, and system architecture to engineer resilient and autonomous ecosystems.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-8">
                    <button className="group relative px-8 py-4 bg-primary text-on-primary font-label-caps text-label-caps rounded-sm overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(107,251,154,0.4)]">
                      <span className="relative z-10">ENTER_ECOSYSTEM</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                    <Link
                      href="/research"
                      className="px-8 py-4 bg-surface-container-high/50 border border-outline-variant/30 text-on-surface font-label-caps text-label-caps rounded-sm hover:bg-surface-container-high transition-all"
                    >
                      VIEW_RESEARCH_PAPERS
                    </Link>
                  </div>
                </div>

                {/* Bottom info */}
                <div className="mt-16 flex flex-wrap gap-8 items-center text-technical-sm font-technical-sm text-primary/40">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    LATENCY: 14MS
                  </div>
                  <div>LOCATION: 37.7749° N, 122.4194° W</div>
                  <div className="text-secondary/60 ml-auto">
                    © 2024 Vaibhav
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Bento Grid Section */}
        <section className="py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Large Card */}
            <div className="md:col-span-8 glass-card rounded-3xl p-8 flex flex-col justify-end min-h-[450px] relative overflow-hidden group border border-outline-variant/30">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvc5zMwsMQ8CYO9eoDuk7Hh_mfPMq0biQgnRZyU61i9zu2g0gPXMnDFUb_Pto6wCXlErIIMI0WsoLfMogtv6v6cMl5jmDNI0M6eQSkEe3rTwncUpdJeIw3FG0f6jOrKSvZNF02xEKgVHLPEA5jf7bDzr2--fVgO9_Q89VHx8NRLMPh1ali7QoOXN-Kq5ZUe1D02DPPFG_5JTzWdEQlY8Jsi_uLlrqHTNVBYRnqI0Eb5w2hBaqNC-YJCQQkPXqna_JayK50DP1S0-qB"
                alt="Neural Infrastructure"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 mb-4 rounded-sm bg-primary/20 text-primary border border-primary/30 text-label-caps font-label-caps">
                  PRIMARY_CORE
                </div>
                <h2 className="text-headline-md font-headline-md text-on-background mb-4">
                  Autonomous AI Infrastructure
                </h2>
                <p className="text-body-md font-body-md text-on-surface-variant max-w-xl">
                  Constructing robust frameworks that thrive on complex data structures, creating interconnected webs of intelligence and agents that scale natively.
                </p>
              </div>
            </div>

            {/* Small Card 1 */}
            <div className="md:col-span-4 glass-card rounded-3xl p-8 border border-secondary/20 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-6 relative z-10">
                <span className="material-symbols-outlined text-secondary">
                  psychology_alt
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="text-headline-md font-headline-md text-on-background mb-3">
                  Distributed Inference
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-6">
                  Distributing AI workloads across decentralized nodes for optimal model performance.
                </p>
                <Link
                  href="/research"
                  className="flex items-center gap-2 text-secondary font-label-caps text-label-caps group-hover:text-primary transition-colors"
                >
                  INITIALIZE_EXPLORATION
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
              </div>
              <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-[120px] text-secondary opacity-10 group-hover:scale-110 transition-transform duration-500">
                share
              </span>
            </div>

            {/* Small Card 2 */}
            <div className="md:col-span-4 glass-card rounded-3xl p-8 border border-tertiary/20 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-tertiary/20 flex items-center justify-center mb-6 relative z-10">
                <span className="material-symbols-outlined text-tertiary">
                  biotech
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="text-headline-md font-headline-md text-on-background mb-3">
                  Self-Optimizing Models
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-6">
                  LLMs and deep learning architectures that adapt to data distributions and usage patterns.
                </p>
                <Link
                  href="/projects"
                  className="flex items-center gap-2 text-tertiary font-label-caps text-label-caps group-hover:text-primary transition-colors"
                >
                  DECODE_SEQUENCE
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
              </div>
              <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-[120px] text-tertiary opacity-10 group-hover:scale-110 transition-transform duration-500">
                biotech
              </span>
            </div>

            {/* Horizontal Card */}
            <div className="md:col-span-8 glass-card rounded-3xl p-8 md:p-12 border border-outline-variant/30 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1W9WujdHTtY6kDWhlOHkZhV9XXegU9LlebHMlH1y5aLtytyeurnCmi9ii4grGh1xEMAy35gFYYV5GeSI3Fyy8uW4uJkSTk9ifQjN4VIlb29DE2NzbhXCyIAYGUpeLjLcW5Db2rxpOCBEJGMZnQHbU5HjYfuf-vRdCQ8MWlK0q2oU-wyanKptCjJTR0dCxBfDGtSkCLvSuZZd1GfS1bzgkKdAH42fBYaIUxIDRQh8jN8EFaRt4I03lrQycVaYEcptvvuUZ4uno3bTH"
                  alt="Hardware Architecture"
                  className="w-full h-full object-cover rounded-2xl aspect-square"
                />
              </div>
              <div className="w-full md:w-2/3">
                <div className="inline-block px-3 py-1 mb-4 rounded-sm bg-surface-container-high text-on-surface-variant border border-outline-variant/50 text-label-caps font-label-caps">
                  SIGNAL_ANALYSIS
                </div>
                <h3 className="text-headline-md font-headline-md text-on-background mb-4">
                  Scalable ML Architectures
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-6">
                  Bridging the gap between software capability and silicon constraints. Deploying multi-agent setups that balance cost, latency, and reasoning power.
                </p>
                <div className="flex gap-4">
                  <span className="text-technical-sm font-technical-sm text-primary/60 border border-primary/20 px-2 py-1 rounded">
                    HARDWARE_V4
                  </span>
                  <span className="text-technical-sm font-technical-sm text-secondary/60 border border-secondary/20 px-2 py-1 rounded">
                    AUTO_REPAIR
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
