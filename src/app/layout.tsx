import type { Metadata } from "next";
import { bricolage, hanken, jetbrains } from "@/ui/fonts";
import { Analytics } from "@vercel/analytics/next";
import "@/ui/globals.css";

export const metadata: Metadata = {
  title: "Vaibhav — projects and things",
  description:
    "Vaibhav's projects, experiments, notes, and assorted attempts at making computers useful.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Material Symbols Outlined */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router root layout loads this icon font globally. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable} font-body-md bg-background text-on-background`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
