"use client";

import { NavConfig, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export function MainNav({ nav }: { nav: NavConfig }) {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">{siteConfig.title}</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {nav.map((item) => {
          const isActive = item.checkExact
            ? item.link === pathname
            : pathname.startsWith(item.link);
          const className = item.className
            ? typeof item.className === "function"
              ? item.className(isActive)
              : item.className
            : cn(
              "transition-colors hover:text-foreground/80",
              isActive ? "text-foreground" : "text-foreground/60"
            );

          return (
            <Link key={item.link} href={item.link} className={className}>
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}