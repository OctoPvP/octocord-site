import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google"

import { GeistSans } from "geist/font/sans";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import Providers from "@/app/providers";
import { type Metadata } from "next";
import { SiteNav } from "@/components/navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = siteConfig;


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col bg-background">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
