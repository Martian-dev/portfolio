import { fira_code } from "@/ui/fonts";
import Link from "next/link";

export default function About() {
  return (
    <section
      className="p-10 h-auto lg:h-full w-full bg-primary border-solid border-b-2 border-b-[#656970]"
      id="about"
    >
      <div className="h-full w-full px-8 md:px-16 lg:px-20 leading-loose">
        <Link
          href="#about"
        >
          <h1
            className={`${fira_code.className} text-[2rem] font-semibold text-fg-secondary hover:underline`}
          >
            about
          </h1>
        </Link>
        <p className="text-[1.2rem]">
          <br />
          {"i'm"} vaibhav, a passionate undergraduate engineering student on a
          mission to explore the frontiers of technology and science.
          <br />
          <br />
          tinkering with code in web development, game development, and app
          development to diving into the exciting world of machine learning, I
          thrive on experimentation across various fields.
          <br />
          <br />
          my journey is fueled by an insatiable curiosity and a love for turning
          ideas into reality.
          <br />
          <br />
        </p>
      </div>
    </section>
  );
}
