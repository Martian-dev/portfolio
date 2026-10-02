"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();
  const isWriting = pathname.startsWith("/blog");

  return (
    <nav aria-label="Mobile navigation" className="md:hidden fixed bottom-0 w-full h-16 bg-surface/95 backdrop-blur-xl border-t border-white/5 flex items-center justify-around z-50 pb-[env(safe-area-inset-bottom)]">
      <Link href="/" className={`flex min-h-11 min-w-16 flex-col items-center justify-center ${pathname === "/" ? "text-primary" : "text-on-surface-variant"}`}>
        <span 
          className="material-symbols-outlined"
          style={pathname === "/" ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          home_max
        </span>
        <span className="text-[10px] font-label-caps mt-1">ECOSYSTEM</span>
      </Link>
      
      {/* Research is a work in progress. Restore this destination when it is ready.
      <Link href="/research" className={`flex min-h-11 min-w-16 flex-col items-center justify-center ${pathname === "/research" ? "text-primary" : "text-on-surface-variant"}`}>
        <span
          className="material-symbols-outlined"
          style={pathname === "/research" ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          account_tree
        </span>
        <span className="text-[10px] font-label-caps mt-1">RESEARCH</span>
      </Link>
      */}
      
      <Link href="/projects" className={`flex min-h-11 min-w-16 flex-col items-center justify-center ${pathname === "/projects" ? "text-primary" : "text-on-surface-variant"}`}>
        <span 
          className="material-symbols-outlined"
          style={pathname === "/projects" ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          psychology
        </span>
        <span className="text-[10px] font-label-caps mt-1">ARTIFACTS</span>
      </Link>
      
      <Link href="/blog" className={`flex min-h-11 min-w-16 flex-col items-center justify-center ${isWriting ? "text-primary" : "text-on-surface-variant"}`}>
        <span 
          className="material-symbols-outlined"
          style={isWriting ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          terminal
        </span>
        <span className="text-[10px] font-label-caps mt-1">WRITING</span>
      </Link>
    </nav>
  );
}
