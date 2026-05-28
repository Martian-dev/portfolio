import type { Metadata } from "next";
import { bricolage, hanken, jetbrains } from "@/ui/fonts";
import { Analytics } from "@vercel/analytics/next";
import "@/ui/globals.css";

export const metadata: Metadata = {
  title: "Vaibhav | Applied AI & Systems Architecture",
  description:
    "Actively working, building, and researching in the tech field. Focused on AI, Agency, LLMs, ML & DL, and system architecture to engineer resilient ecosystems.",
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
