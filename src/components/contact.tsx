import { fira_code } from "@/ui/fonts";
import Link from "next/link";
import ContactForm from "@/ui/contact-form";
import Socials from "@/ui/socials";

export default function Contact() {
  return (
    <section className="p-10 h-auto lg:h-full w-full bg-primary" id="contacts">
      <div className="h-full w-full px-8 md:px-16 lg:px-20 leading-loose">
        <Link
          href="#contacts"
        >
          <h1
            className={`${fira_code.className} text-[2rem] font-semibold text-fg-secondary hover:underline`}
          >
            contact
          </h1>
        </Link>
        <div className="flex flex-col items-center h-auto">
          <ContactForm />
          <Socials />
        </div>
      </div>
    </section>
  );
}
