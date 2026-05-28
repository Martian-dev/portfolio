"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import { blogData } from "@/data/content";

export default function BlogPage() {
  useEffect(() => {
    const handleScroll = () => {
      const vine = document.getElementById("reading-vine");
      if (vine) {
        const winScroll =
          document.body.scrollTop || document.documentElement.scrollTop;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        vine.style.height = scrolled + "%";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Reading Progress Vine */}
      <div
        id="reading-vine"
        className="fixed right-0 top-0 w-1 bg-primary/20 z-[60] h-0 vine-progress origin-top"
      >
        <div className="absolute bottom-0 -left-1.5 w-4 h-4 bg-primary rounded-full blur-[2px] animate-pulse"></div>
      </div>

      <Navbar />

      <main className="pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto max-w-4xl relative">
        {/* Hero Header Section */}
        <div className="mb-16">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background max-w-3xl leading-tight">
            Dispatches from the <span className="text-primary italic">Deep Web</span>.
          </h1>
          <p className="mt-6 text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
            Monitoring the growth of neural architectures, language models, and synthetic ecologies within our systems.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <span className="px-4 py-1.5 rounded-full border border-primary/30 text-primary font-technical-sm text-technical-sm bg-primary/5">
              #AI_ETHICS
            </span>
            <span className="px-4 py-1.5 rounded-full border border-secondary/30 text-secondary font-technical-sm text-technical-sm bg-secondary/5">
              #SYSTEM_ARCHITECTURE
            </span>
            <span className="px-4 py-1.5 rounded-full border border-tertiary/30 text-tertiary font-technical-sm text-technical-sm bg-tertiary/5">
              #SYSTEM_STABILITY
            </span>
          </div>
        </div>

        {/* Blog Feed */}
        <div className="space-y-24">
          {blogData.map((post) => (
            <div key={post.id}>
              {post.layout === "standard" && (
                <article className="grid grid-cols-1 md:grid-cols-12 gap-6 group cursor-pointer">
                  <div className="md:col-span-1 hidden md:flex">
                    <div className="vertical-text text-on-surface-variant font-technical-sm text-technical-sm whitespace-nowrap">
                      {post.date} // {post.time}
                    </div>
                  </div>
                  <div className="md:col-span-7 overflow-hidden rounded-xl border border-white/5 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-40"></div>
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={450}
                      unoptimized
                      className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute top-6 left-6 z-20 bg-primary text-on-primary font-label-caps text-technical-sm px-3 py-1 rounded">
                      {post.category}
                    </div>
                  </div>
                  <div className="md:col-span-4 flex flex-col justify-center space-y-4">
                    <h2 className="font-headline-md text-headline-md text-on-surface leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-body-md font-body-md text-on-surface-variant">
                      {post.description}
                    </p>
                    <div className="flex items-center space-x-4 pt-4 text-on-surface-variant font-technical-sm text-technical-sm">
                      <span>Read Time: {post.readTime}</span>
                      <div className="flex-1 h-px bg-outline-variant/50"></div>
                      <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                  {/* Mobile Date */}
                  <div className="col-span-1 md:hidden">
                    <div className="text-on-surface-variant font-technical-sm text-technical-sm mt-2">
                      {post.date} // {post.time}
                    </div>
                  </div>
                </article>
              )}

              {post.layout === "reverse" && (
                <article className="grid grid-cols-1 md:grid-cols-12 gap-6 group cursor-pointer">
                  <div className="md:col-span-4 order-2 md:order-1 flex flex-col justify-center space-y-4 md:text-right">
                    <h2 className="font-headline-md text-headline-md text-on-surface leading-tight group-hover:text-secondary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-body-md font-body-md text-on-surface-variant">
                      {post.description}
                    </p>
                    <div className="flex items-center space-x-4 pt-4 text-on-surface-variant font-technical-sm text-technical-sm md:flex-row-reverse">
                      <span className="material-symbols-outlined text-secondary group-hover:-translate-x-1 transition-transform md:ml-4 mr-0 md:mr-0 mr-4">
                        arrow_back
                      </span>
                      <div className="flex-1 h-px bg-outline-variant/50"></div>
                      <span className="md:mr-4 ml-0">Read Time: {post.readTime}</span>
                    </div>
                  </div>
                  <div className="md:col-span-7 order-1 md:order-2 overflow-hidden rounded-xl border border-white/5 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-40"></div>
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={450}
                      unoptimized
                      className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute top-6 right-6 z-20 bg-secondary text-on-secondary font-label-caps text-technical-sm px-3 py-1 rounded">
                      {post.category}
                    </div>
                  </div>
                  <div className="md:col-span-1 order-3 hidden md:flex justify-end">
                    <div className="vertical-text text-on-surface-variant font-technical-sm text-technical-sm whitespace-nowrap group-hover:text-secondary transition-colors">
                      {post.date} // {post.time}
                    </div>
                  </div>
                  {/* Mobile date */}
                  <div className="col-span-1 order-3 md:hidden">
                    <div className="text-on-surface-variant font-technical-sm text-technical-sm mt-2">
                      {post.date} // {post.time}
                    </div>
                  </div>
                </article>
              )}

              {post.layout === "long-form" && (
                <article className="grid grid-cols-1 md:grid-cols-12 gap-6 group cursor-pointer">
                  <div className="md:col-span-1 hidden md:flex">
                    <div className="vertical-text text-on-surface-variant font-technical-sm text-technical-sm whitespace-nowrap group-hover:text-tertiary transition-colors">
                      {post.date} // {post.time}
                    </div>
                  </div>
                  <div className="md:col-span-11 frosted-leaf p-8 md:p-12 rounded-2xl flex flex-col md:flex-row gap-12 items-center hover:bg-surface-container-high/50 transition-all duration-500 overflow-hidden relative">
                    <div className="md:w-1/2 space-y-6 z-10">
                      <div className="font-label-caps text-technical-sm text-tertiary">
                        {post.category}
                      </div>
                      <h2 className="font-headline-md text-[40px] leading-tight text-on-surface group-hover:text-tertiary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-body-md font-body-md text-on-surface-variant">
                        {post.description}
                      </p>
                      <button className="px-8 py-3 bg-tertiary text-on-tertiary font-label-caps text-label-caps rounded-full glow-hover transition-all mt-4 inline-block">
                        {post.actionText || "ACCESS POST"}
                      </button>
                    </div>
                    <div className="md:w-1/2 z-10 w-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={600}
                        unoptimized
                        className="rounded-xl shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 w-full aspect-square object-cover"
                      />
                    </div>
                  </div>
                  {/* Mobile date */}
                  <div className="col-span-1 md:hidden">
                    <div className="text-on-surface-variant font-technical-sm text-technical-sm mt-4">
                      {post.date} // {post.time}
                    </div>
                  </div>
                </article>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-24 flex justify-between items-center border-t border-outline-variant/20 pt-12">
          <button className="flex items-center space-x-2 text-on-surface-variant hover:text-primary transition-colors group">
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
              west
            </span>
            <span className="font-label-caps text-technical-sm hidden sm:inline-block">
              PREVIOUS_SIGNALS
            </span>
          </button>

          <div className="flex space-x-4 items-center">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-on-primary font-technical-sm text-technical-sm">
              01
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant font-technical-sm text-technical-sm transition-colors">
              02
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant font-technical-sm text-technical-sm transition-colors">
              03
            </button>
          </div>

          <button className="flex items-center space-x-2 text-on-surface-variant hover:text-primary transition-colors group">
            <span className="font-label-caps text-technical-sm hidden sm:inline-block">
              NEXT_SIGNALS
            </span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              east
            </span>
          </button>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </>
  );
}
