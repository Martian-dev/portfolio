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
          <div className="flex-grow lg:overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
