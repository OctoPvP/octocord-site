import "@/styles/globals.css";

import { GeistSans } from 'geist/font/sans';
import { siteConfig } from "@/lib/site-config";
import Providers from "@/app/providers";
import { type Metadata } from "next";

export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
