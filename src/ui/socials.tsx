import { TwitterLogoIcon, DiscordLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Socials() {
  return (
    <div className="flex w-full justify-evenly p-4 flex-wrap">
      <Link
        className="hover:text-fg-secondary hover:scale-110 transition-all duration-75 ease-in-out"
        href="https://twitter.com/martian75007"
      >
        <TwitterLogoIcon className="size-10" />
      </Link>
      <Link
        className="hover:text-fg-secondary hover:scale-110 transition-all duration-75 ease-in-out"
        href="https://github.com/Martian-dev"
      >
        <DiscordLogoIcon className="size-10" />
      </Link>
      <Link
        className="hover:text-fg-secondary hover:scale-110 transition-all duration-75 ease-in-out"
        href="https://linkedin.com/in/vaibhav-p-dev"
      >
        <LinkedInLogoIcon className="size-10" />
      </Link>

    </div>
  );
}
