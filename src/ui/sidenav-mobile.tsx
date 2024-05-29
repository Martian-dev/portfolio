"use client"
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { fira_code } from "@/ui/fonts";
import Link from "next/link";

export default function SidenavMobile() {
  const [collapsed, setCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70);
    }

    window.addEventListener("scroll", handleScroll);
    return () => { window.removeEventListener("scroll", handleScroll); };
  }, []);

  return (<nav className={`flex flex-col w-full fixed ${collapsed && !scrolled ? "" : "bg-navcolor"} transition-all duration-100`}>
    <div className={`p-4 ${collapsed ? "" : "pb-0"} flex flex-row justify-start items-center`}>
      {collapsed ?
        <Bars3Icon
          className="size-10 text-white hover:cursor-pointer fixed"
          onClick={() => { setCollapsed(!collapsed); }}
        />
        :
        <XMarkIcon
          className="text-white size-10 hover:cursor-pointer fixed"
          onClick={() => { setCollapsed(!collapsed); }}
        />}
      <Link
        href="/"
        className="mx-auto"
        onClick={() => { setCollapsed(!collapsed) }}
      >
        <h1 className={`text-[2.5rem] ${fira_code.className} font-bold text-fg-secondary`}>vaibhav</h1>
      </Link>
    </div>
    <div className={`${collapsed ? "hidden" : "block"} flex flex-col justify-center items-center p-2 text-[1.5rem]`}>
      <Link
        href="#about"
        className="p-4"
        onClick={() => { setCollapsed(!collapsed) }}
      >
        about
      </Link>
      <Link
        href="#projects"
        className="p-4"
        onClick={() => { setCollapsed(!collapsed) }}
      >
        projects
      </Link>
      <Link
        href="#contacts"
        className="p-4"
        onClick={() => { setCollapsed(!collapsed) }}
      >
        contact
      </Link>
    </div>
  </nav>);
}
