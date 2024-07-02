import { type NavConfig } from "@/lib/site-config";
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


type BaseLayoutProps = {
  children: React.ReactNode;
  nav: NavConfig;
}
const BaseLayout = (props: BaseLayoutProps) => {
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
            <SiteNav nav={props.nav} />
            {props.children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
export default BaseLayout;