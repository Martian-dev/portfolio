"use client"
import sendEmail from "@/utils/actions";
import { useRef } from "react";

export default function ContactForm() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      className="flex flex-col gap-2 p-2 max-w-xl w-full text-[1.2rem]"
      action={async (formData) => {
        await sendEmail(formData);
        ref.current?.reset();
      }}
      method="PUT"
    >
      <label htmlFor="name">name:</label>
      <input
        className="bg-primary border-solid border-2 border-[#656970] p-2 active:border-[#656970] rounded-md"
        type="text"
        name="name"
        placeholder="anatoly"
        required />
      <label htmlFor="email">email:</label>
      <input className="bg-primary border-solid border-2 border-[#656970] p-2 active:border-[#656970] rounded"
        type="email"
        name="email"
        placeholder="anatoly@example.com"
        required />
      <label htmlFor="message">message:</label>
      <textarea
        className="bg-primary border-solid border-2 border-[#656970] p-2 active:border-[#656970] rounded"
        name="message"
        placeholder="you are awesome."
        required />
      <button
        className="w-full bg-accent rounded-md mt-2 hover:scale-105 transition-all ease-in duration-200"
        type="submit">
        submit
      </button>
    </form>
  );
}
