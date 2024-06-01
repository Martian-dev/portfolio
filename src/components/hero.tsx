import { fira_code } from "@/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="p-12 h-auto lg:h-full w-full bg-primary border-solid border-b-2 border-b-[#656970]">
      <div className="h-full w-full grid md:grid-cols-2 place-items-center justify-center">
        <div className="h-full w-full p-8 leading-loose flex flex-col items-center md:items-start md:px-16 xl:px-20">
          <h1
            className={`${fira_code.className} text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-semibold`}
          >
            hi!!👋
          </h1>
          <p className="text-[1.6rem]">
            {"i'm "}
            <span className="underline hover:bg-[#EEEEEE] transition-all ease-in delay-50 duration-200 hover:text-gray-800 hover:p-1">
              Vaibhav
            </span>{" "}
            a.k.a martian
          </p>
          <p className="text-[1.6rem]">
            a student at VIT chennai,
          </p>
          <p className="text-[1.6rem]">
            experimenting with various technologies.
          </p>
          <Link
            href="https://github.com/Martian-dev"
            target="_blank"
          >
            <button
              className="rounded-lg border-2 border-solid border-[#656970] bg-accent w-52 p-3 my-6"
            >
              visit my github
            </button>
          </Link>
        </div>
        <div className="row-start-1 md:col-start-2 h-full w-full py-16 xl:px-20 xl:py-20 flex justify-center">
          <div>
            <Image
              src="/images/pfp.png"
              alt="Profile picture"
              width={250}
              height={250}
              className="block object-cover rounded-full border-2 border-solid border-[#656970]"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}

// TODO redo the hero page with mobile first approach
