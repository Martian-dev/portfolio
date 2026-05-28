"use client";

import { useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import { projectsData } from "@/data/content";

export default function Projects() {
  // Mouse tracking effect for bento grid articles
  useEffect(() => {
    const cards = document.querySelectorAll('article');
    const handlers: Array<{ card: Element; handler: (e: Event) => void, leaveHandler: () => void }> = [];
    
    cards.forEach(card => {
      const handler = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        (card as HTMLElement).style.borderColor = `rgba(74, 222, 128, ${Math.min(0.6, 0.2 + (x / rect.width) * 0.4)})`;
      };
      
      const leaveHandler = () => {
        (card as HTMLElement).style.borderColor = 'rgba(74, 222, 128, 0.2)';
      };
      
      card.addEventListener('mousemove', handler);
      card.addEventListener('mouseleave', leaveHandler);
      handlers.push({ card, handler, leaveHandler });
    });
    
    return () => {
      handlers.forEach(({ card, handler, leaveHandler }) => {
        card.removeEventListener('mousemove', handler);
        card.removeEventListener('mouseleave', leaveHandler);
      });
    };
  }, []);

  // Particle canvas effect
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.3';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random(),
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#4ade80';
      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div className="bg-mesh min-h-screen relative">
      <Navbar />
      <main className="relative z-10 pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        {/* Page Header (mb-16) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex-1">
            <span className="font-technical-sm text-technical-sm text-primary-fixed tracking-widest uppercase mb-2 block glow-sm">
              Fabrication Chamber
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-none mb-4">
              The Forge
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              A curated repository of architectural builds, ranging from low-latency neural interfaces to core bio-mechanical system engineering.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2 rounded-full border border-primary text-primary font-label-caps text-label-caps bg-primary/10">
              All Builds
            </button>
            <button className="px-5 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-variant/20 transition-all">
              Neural Net
            </button>
            <button className="px-5 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-variant/20 transition-all">
              Core Systems
            </button>
            <button className="px-5 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-variant/20 transition-all">
              Experimental
            </button>
          </div>
        </div>

        {/* Bento Grid Projects */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          
          {/* Project 1: Featured */}
          <article className="md:col-span-8 frosted-leaf rounded-xl overflow-hidden vine-border transition-all duration-500 group relative flex flex-col">
            <div className="h-[400px] overflow-hidden relative flex-shrink-0">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqQSo27Iz68Sql7JP7GL25Om2AZwPnr2vOgcJqdDIWR5VE5kiSr_nCnUDEo09eGV14cPcleJSno2xUQXtUUEpzLcdLy_B3z78Pn0x__mRKuVUXCYPuWCLXPBlAHyYiVrQSgxH9jk8rPavh4XubyCrsGTsWVorotar3guxvPWh3sU1zVnTD870e1yA92VrS-64dGfKNMiAH9q2LGTR28laNOMd9v7GWnvGkzC4a61z_l4QsB86aizY16r-BrrEs9EcVQ7rK-X5scoBi"
                alt="Chlorophyll-AI V4"
                fill
                unoptimized
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary-container/30 text-secondary border border-secondary/20 backdrop-blur-md uppercase tracking-wider">
                  {projectsData[0].status}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-surface-container-highest/50 text-on-surface-variant border border-outline-variant/30 backdrop-blur-md uppercase tracking-wider">
                  {projectsData[0].category}
                </span>
              </div>
            </div>
            
            <div className="p-8 relative z-10 flex flex-col flex-grow bg-surface/40">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-headline-md text-headline-md text-on-surface">{projectsData[0].title}</h3>
                <div className="text-right">
                  <p className="font-technical-sm text-technical-sm text-on-surface-variant">Latency {projectsData[0].latency}</p>
                  <p className="font-technical-sm text-technical-sm text-primary">Uptime {projectsData[0].uptime}</p>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-2xl">
                {projectsData[0].description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {projectsData[0].tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-surface-variant/30 text-secondary-fixed-dim rounded-full border border-secondary/10 text-xs font-medium">{tag}</span>
                ))}
              </div>
              <div className="mt-auto flex justify-start">
                <button className="flex items-center gap-2 font-label-caps text-label-caps text-primary hover:text-primary-fixed transition-colors">
                  Inspect Architecture
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </article>

          {/* Project 2: Vertical */}
          <article className="md:col-span-4 frosted-leaf rounded-xl overflow-hidden vine-border transition-all duration-500 flex flex-col group relative">
            <div className="h-56 overflow-hidden relative flex-shrink-0">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8mbxyTu7QE6HBbqhebv0U1Es8oadh3qHvLgJcgRng59VqAa1jY3dlNHyaebt42Z7nUJXvs-sLE_0hMkHJO7oANRliT9Q-Xjh6clo25pEREVj0VGc4Qg_NUMrc7gM4v3acvw37MNTGNsvOj242a5TZhAynCak_Cbn3tA438KOoL_jFs_tHFqmtrkpcYcS8HPrBxCWlIh--blB0PbQdH9g_ShLmtlxrMTWYdjq11_XqkaL-IMGHv13VWrTTuRiEUy8hLN6b5bUwQTbK"
                alt="Root-Kernel 0x1"
                fill
                unoptimized
                className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            <div className="p-6 flex-grow flex flex-col bg-surface/30">
              <span className="text-tertiary font-label-caps text-label-caps mb-2 block">{projectsData[1].category}</span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">{projectsData[1].title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                {projectsData[1].description}
              </p>
              <div className="mt-auto border-t border-outline-variant/20 pt-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-technical-sm text-technical-sm text-on-surface-variant">Encryption</span>
                  <span className="font-technical-sm text-technical-sm text-on-surface">{projectsData[1].encryption}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-technical-sm text-technical-sm text-on-surface-variant">Integrity</span>
                  {projectsData[1].integrity === "Verified" ? (
                    <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  ) : (
                    <span className="font-technical-sm text-technical-sm text-on-surface">{projectsData[1].integrity}</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6 pt-0 bg-surface/30">
              <button className="w-full py-3 rounded border border-outline-variant/30 text-on-surface font-label-caps text-label-caps hover:bg-surface-variant/20 transition-all flex items-center justify-center gap-2 bioluminescent-btn">
                View Logs
              </button>
            </div>
          </article>

          {/* Project 3: Technical */}
          <article className="md:col-span-6 frosted-leaf rounded-xl overflow-hidden vine-border transition-all duration-500 group flex flex-col relative bg-surface/30">
            <div className="p-8 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">sensors</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-error-container/20 text-error border border-error/20 uppercase tracking-wider">
                    {projectsData[2].status}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">{projectsData[2].title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                  {projectsData[2].description}
                </p>
                
                <div className="bg-surface-container-highest/40 rounded-lg p-4 border border-outline-variant/20 mb-6 flex items-end h-24 gap-1">
                  {[20, 40, 10, 80, 30, 60, 15, 100, 25].map((height, i) => (
                    <div 
                      key={i} 
                      className="flex-grow rounded-t-sm transition-all duration-1000 bg-primary/60 hover:bg-primary"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-6 border-t border-outline-variant/20 pt-4">
                <div>
                  <p className="font-technical-sm text-technical-sm text-on-surface-variant mb-1">Nodes</p>
                  <p className="font-headline-md text-headline-md text-on-surface">{projectsData[2].nodes}</p>
                </div>
                <div>
                  <p className="font-technical-sm text-technical-sm text-on-surface-variant mb-1">Range</p>
                  <p className="font-headline-md text-headline-md text-on-surface">{projectsData[2].range}</p>
                </div>
              </div>
            </div>
          </article>

          {/* Project 4: Split Grid */}
          <article className="md:col-span-6 frosted-leaf rounded-xl overflow-hidden vine-border transition-all duration-500 group relative">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              <div className="p-8 flex flex-col justify-between h-full bg-surface/30 relative z-10 order-2 md:order-1">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-4">{projectsData[3].title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                    {projectsData[3].description}
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="font-technical-sm text-technical-sm text-primary">{projectsData[3].connectionStatus}</span>
                  </div>
                  <div className="font-technical-sm text-technical-sm text-on-surface-variant opacity-70">
                    Hash: {projectsData[3].hash}
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden bg-surface-container-highest min-h-[250px] md:min-h-full order-1 md:order-2">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFy-F7AMV1gSo4ypT4EksLXwKXuwMCTHscp01pAbVBfR2PR1ji9d8KDW9Oj5_NTsIOT4HFpY3j9OLE1lfhR17DlqqRZVAmMNJy4TgDJVdclVCgB4yvy3j6SzrpTmHlAhhjVxAJTP0lXDx64aDwXYkHbL1hMEjYWY4vVL1LDMm2xCHdMgJih1PVaqlxEOVnrc3o6ci8nOBQei1_QKtmhUP3GWTp9CTRhlH7DL43C9RuwMEtAqDcNlpdNO7hM9e9w4J1uK42kO8iFxmH"
                  alt="Mycelium Sync"
                  fill
                  unoptimized
                  className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-primary/20 bg-surface/50 backdrop-blur flex items-center justify-center group-hover:border-primary/50 transition-colors">
                    <span className="material-symbols-outlined text-primary text-3xl">terminal</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
