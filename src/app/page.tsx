import Link from "next/link";

import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
// import Contact from "@/components/contact";

export default function Home() {
  return (
    <div className="w-full max-w-3xl m-auto">
      <Hero />
      <About />
      <Projects />
      <section
        className="p-6 pb-12 h-auto lg:h-full w-full bg-primary flex gap-4"
      >
        <Link href="https://drive.google.com/file/d/1D1vjTmtsbNaJL4qR2OXHLsFn-zAD_9IM/view?usp=sharing" className="flex">
          <p className="text-[1.5rem] hover:underline text-gray-300">resume</p><ArrowTopRightIcon className="size-5" />
        </Link>
        <Link href="https://www.youtube.com/@_martiandev" className="flex">
          <p className="text-[1.5rem] hover:underline text-gray-300">youtube</p><ArrowTopRightIcon className="size-5" />
        </Link>
        <Link href="https://www.kaggle.com/martian7/code" className="flex">
          <p className="text-[1.5rem] hover:underline text-gray-300">kaggle</p><ArrowTopRightIcon className="size-5" />
        </Link>
      </section>
    </div>
  );
}
