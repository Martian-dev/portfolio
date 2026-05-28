"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 w-full h-16 bg-surface/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around z-50">
      <Link href="/" className={`flex flex-col items-center ${pathname === "/" ? "text-primary" : "text-on-surface-variant"}`}>
        <span 
          className="material-symbols-outlined"
          style={pathname === "/" ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          home_max
        </span>
        <span className="text-[10px] font-label-caps mt-1">ECOSYSTEM</span>
      </Link>
      
      <Link href="/research" className={`flex flex-col items-center ${pathname === "/research" ? "text-primary" : "text-on-surface-variant"}`}>
        <span 
          className="material-symbols-outlined"
          style={pathname === "/research" ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          account_tree
        </span>
        <span className="text-[10px] font-label-caps mt-1">RESEARCH</span>
      </Link>
      
      <Link href="/projects" className={`flex flex-col items-center ${pathname === "/projects" ? "text-primary" : "text-on-surface-variant"}`}>
        <span 
          className="material-symbols-outlined"
          style={pathname === "/projects" ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          psychology
        </span>
        <span className="text-[10px] font-label-caps mt-1">ARTIFACTS</span>
      </Link>
      
      <Link href="/blog" className={`flex flex-col items-center ${pathname === "/blog" ? "text-primary" : "text-on-surface-variant"}`}>
        <span 
          className="material-symbols-outlined"
          style={pathname === "/blog" ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          terminal
        </span>
        <span className="text-[10px] font-label-caps mt-1">SIGNALS</span>
      </Link>
    </nav>
  );
}
