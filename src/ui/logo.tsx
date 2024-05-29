"use client";

import { fira_code } from "@/ui/fonts";

export default function Logo({
  collapsed,
  isDesktop,
}: {
  collapsed: boolean;
  isDesktop: boolean;
}) {
  return (
    <div className={`${fira_code.className} text-white leading-none`}>
      <h1
        className={`text-[2rem] font-bold text-fg-secondary hover:underline ${isDesktop && collapsed ? "translate-x-2" : " "
          }`}
      >
        {isDesktop && collapsed ? "V." : "vaibhav"}
      </h1>
    </div>
  );
}
