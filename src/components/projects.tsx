import { fira_code } from "@/ui/fonts";
import Link from "next/link";

interface Project {
  name: string;
  url: string;
  desc: string;
}

const projects: Project[] = [
  {
    name: "zen",
    desc: "my implementation of how a frictionless task scheduler is supposed to be.",
    url: "https://github.com/Martian-dev/zen",
  },
  {
    name: "tic-tac-toe",
    url: "https://github.com/Martian-dev/TicTacToe",
    desc: "multiplayer tictactoe game.",
  },
  {
    name: "dash",
    url: "https://github.com/Martian-dev/dash",
    desc: "posix compliant shell written using c++.",
  },
  {
    name: "protein.sh",
    url: "https://github.com/Martian-dev/protein.sh",
    desc: "inspired by terminal.shop, i wanted to build my own terminal based shop, for fitness supplements. trying to do it with a language i am not familiar with (go)",
  },
  {
    name: "ace",
    url: "https://github.com/Martian-dev/ace",
    desc: "yes another task management app, but this time aimed at teams and organizations",
  },
];

export default function Projects() {
  return (
    <section className="p-6 h-auto lg:h-full w-full bg-primary" id="projects">
      <div className="h-full w-full leading-8">
        <Link href="#projects">
          <h1
            className={`${fira_code.className} text-[2rem] font-semibold text-fg-secondary hover:underline`}
          >
            Builds
          </h1>
        </Link>
        <ul className="text-[1.2rem] py-3">
          <p>these are my ongoing projects</p>
          {projects.map(({ name, url, desc }: Project, i) => (
            <li key={i} className="py-2">
              <Link
                href={url}
                className="text-fg-accent hover:underline underline-offset-2 font-medium"
              >
                {`${name}: `}
              </Link>
              <p className="inline">{desc}</p>
            </li>
          ))}
        </ul>
        <p className="text-[1.2rem] py-3">
          there are lots of other projects, you can find them in my{" "}
          <Link
            className="text-gray-300 font-bold underline hover:bg-gray-300 hover:text-[#262427]"
            href="https://github.com/Martian-dev"
          >
            github
          </Link>{" "}
          and my{" "}
          <Link
            className="text-gray-300 hover:bg-gray-300 hover:text-[#262427] font-bold"
            href="https://www.kaggle.com/martian7/code"
          >
            kaggle.
          </Link>
        </p>
      </div>
    </section>
  );
}
