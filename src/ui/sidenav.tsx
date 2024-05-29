"use client";

import Link from "next/link";
import {
  InformationCircleIcon,
  WrenchScrewdriverIcon,
  UserIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/ui/logo";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import SidenavMobile from "@/ui/sidenav-mobile";

export default function SideNav() {
  const [collapsed, setCollapsed] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)", {
    defaultValue: true,
    initializeWithValue: false,
  });

  return isDesktop ? (
    <nav
      className={`flex h-full flex-col bg-navcolor py-4 px-1 items-center font-medium text-[1.3rem] border-r-2 border-solid border-[#656970] transition-all ease-in-out duration-150 ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="py-5 px-5">
        <Link href="/" scroll={false}>
          <Logo isDesktop={isDesktop} collapsed={collapsed} />
        </Link>
      </div>
      <div className="py-5 px-5">
        <Link
          href="#about"
          className="hover:underline flex gap-3 items-center"
        >
          <InformationCircleIcon className="text-white size-7 w-7 h-7" />
          <p className={`${collapsed ? "hidden" : "inline-block"}`}>about</p>
        </Link>
      </div>
      <div className="py-5 px-5">
        <Link
          href="#projects"
          className="hover:underline flex gap-3 items-center"
        >
          <WrenchScrewdriverIcon className="text-white size-6" />
          <p className={`${collapsed ? "hidden" : "inline-block"}`}>projects</p>
        </Link>
      </div>
      <div className="py-5 px-5">
        <Link
          href="#contacts"
          className="hover:underline flex gap-3 items-center"
        >
          <UserIcon className="text-white size-7" />
          <p className={`${collapsed ? "hidden" : "inline-block"}`}>contacts</p>
        </Link>
      </div>
      <div className="mt-auto w-full">
        <button
          className="text-white bg-transparent w-full h-10 flex justify-center gap-3 items-center"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          <p className={`${collapsed ? "hidden" : "inline-block"}`}>collapse</p>
          <ChevronDoubleLeftIcon
            className={`text-white size-7 hover:scale-125 transition ease-in duration-500 ${collapsed ? "rotate-180" : ""
              }`}
          />
        </button>
      </div>
    </nav>
  ) : (
    <SidenavMobile />
  );
}

// TODO make animations for the links
