import { TwitterLogoIcon, LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Socials() {
  return (
    <div className="flex w-full justify-evenly gap-2 flex-wrap py-1">
      <Link
        className="hover:text-fg-secondary hover:scale-110 transition-all duration-75 ease-in-out"
        href="https://twitter.com/martian75007"
      >
        <TwitterLogoIcon className="size-4" />
      </Link>
      <Link
        className="hover:text-fg-secondary hover:scale-110 transition-all duration-75 ease-in-out"
        href="https://github.com/Martian-dev"
      >
        <GitHubLogoIcon className="size-4" />
      </Link>
      <Link
        className="hover:text-fg-secondary hover:scale-110 transition-all duration-75 ease-in-out"
        href="https://linkedin.com/in/vaibhav-p-dev"
      >
        <LinkedInLogoIcon className="size-4" />
      </Link>
    </div>
  );
}
