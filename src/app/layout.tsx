import type { Metadata } from "next";
import { roboto_slab } from "@/ui/fonts";
import "@/ui/globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Vaibhav",
  description: "Vaibhav's portfolio website made using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto_slab.className} bg-primary`}>
        {/*<header className="flex-none">
            <SideNav />
          </header>*/}
        <div className="flex-grow lg:overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
