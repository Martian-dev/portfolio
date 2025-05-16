import { fira_code } from "@/ui/fonts";
import Link from "next/link";

export default function About() {
  return (
    <section
      className="px-6 h-auto lg:h-full w-full bg-primary"
      id="about"
    >
      <div className="h-full w-full">
        <Link
          href="#about"
        >
          <h1
            className={`${fira_code.className} text-[2rem] font-semibold text-fg-secondary hover:underline`}
          >
            About
          </h1>
        </Link>
        <p className="text-[1.2rem] leading-8">
          <br />
          {"i'm"} vaibhav, i build projects with new technologies, and explore the advancements in the field.
          <br />
          <br />
          recently, i have been working with {"LLM's"} and learning ML. you can find my crafts over at <Link className="text-gray-300 hover:underline" href="https://github.com/Martian-dev">github.</Link>
          <br />
          <br />
          i am also actively looking for internships/work opportuntities, so if you got something for me reach out to me through my <Link href="https://x.com/martian75007" className="text-gray-300 hover:underline">twitter profile.</Link>
          <br />
          <br />
        </p>
      </div>
    </section>
  );
}
