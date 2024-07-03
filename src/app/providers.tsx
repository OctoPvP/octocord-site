"use client";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "next-themes";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <TRPCReactProvider>
            <ThemeProvider forcedTheme={"dark"} attribute={"class"} enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </TRPCReactProvider>
    );
};

export default Providers;