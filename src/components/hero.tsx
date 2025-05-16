import Image from "next/image";
import Link from "next/link";
import Socials from "@/ui/socials";

export default function Hero() {
  return (
    <main className="pt-6 h-auto lg:h-full w-full bg-primary">
      <div className="h-full w-full grid md:grid-cols-2 place-items-center justify-center">
        <div className="row-start-1 md:col-start-1 h-full w-full py-8 flex justify-center lg:justify-start">
          <div>
            <Image
              src="/images/pfp.png"
              alt="Profile picture"
              width={160}
              height={160}
              className="block object-cover rounded-full border-2 border-solid border-[#656970]"
              priority
            />
          </div>
        </div>
        <div className="h-full w-full py-6 leading-loose flex flex-col items-center lg:items-end justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl py-1">
              Vaibhav
            </h1>
            <h3 className="text-md text-gray-300 py-1">
              Developer | Student
            </h3>
            <Socials />
          </div>

          {/*
          <Link
            href="https://github.com/Martian-dev"
            target="_blank"
          >
            <button
              className="rounded-lg border-2 border-solid border-[#656970] bg-accent w-52 p-3 mt-6"
            >
              visit my github
            </button>
          </Link>
          */}
        </div>
      </div>
    </main>
  );
}

// TODO redo the hero page with mobile first approach
