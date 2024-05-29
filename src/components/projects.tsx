import { fira_code } from "@/ui/fonts";
import Link from "next/link";

interface Project {
  name: string;
  url: string;
  desc: string;
};

const projects: Project[] = [
  {
    name: "chatrooms",
    url: "https://https://chatroom-prod.up.railway.app/",
    desc: "basic chat room app built using html, express.js and socket.io."
  },
  {
    name: "financial-dashboard",
    url: "https://nextjs-dashboard-eight-theta-17.vercel.app/",
    desc: "non functional financial dashboard with user authentication built using next.js."
  },
  {
    name: "tic-tac-toe",
    url: "https://github.com/Martian-dev/TicTacToe",
    desc: "multiplayer tic tac toe game built using html, css, js, express.js and socket.io."
  },
  {
    name: "planet-simulation",
    url: "https://github.com/Martian-dev/planet-simulation-python",
    desc: "2D planet simulation using python and pygame."
  },
  {
    name: "calculator",
    url: "https://github.com/Martian-dev/calculator.java",
    desc: "scientific calculator built using java swing."
  },
  {
    name: "password-manager",
    url: "https://github.com/Martian-dev/password-manager",
    desc: "cli based password manager built using python and mysql database."
  },
];

export default function Projects() {
  return (
    <section
      className="p-10 h-auto lg:h-full w-full bg-primary border-solid border-b-2 border-b-[#656970]"
      id="projects"
    >
      <div className="h-full w-full px-8 md:px-16 lg:px-20 leading-loose">
        <Link
          href="#projects"
        >
          <h1
            className={`${fira_code.className} text-[2rem] font-semibold text-fg-secondary hover:underline`}
          >
            projects
          </h1>
        </Link>
        <ul className="text-[1.2rem] py-3">
          {
            projects.map(({ name, url, desc }: Project, i) => (
              <li key={i} className="py-2">
                <Link
                  href={url}
                  className="text-fg-accent hover:underline underline-offset-2 font-medium"
                >
                  {`${name}: `}
                </Link>
                <p className="inline">
                  {desc}
                </p>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  );
}
