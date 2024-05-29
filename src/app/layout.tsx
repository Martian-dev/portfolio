import type { Metadata } from "next";
import { roboto_slab } from "@/ui/fonts";
import "@/ui/globals.css";
import SideNav from "@/ui/sidenav";

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
      <body className={`${roboto_slab.className} bg-navcolor`}>
        <div className="flex h-screen flex-col lg:flex-row lg:overflow-hidden">
          <header className="flex-none">
            <SideNav />
          </header>
          <div className="flex-grow lg:overflow-y-auto">
            {children}
            <footer className="bg-primary text-[0.8rem] border-t-2 border-solid border-[#656970] w-full h-auto p-4 flex justify-center items-center">© 2024 All Rights Reserved - Vaibhav</footer>
          </div>
        </div>
      </body>
    </html>
  );
}
