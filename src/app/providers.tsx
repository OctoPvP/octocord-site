"use client";

import { AnimationSection } from "@/app/components/framer/animation-context";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import React from "react";

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}


const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <TRPCReactProvider>
            <SessionProvider>
                <ThemeProvider attribute={"class"} defaultTheme="dark">
                    <AnimationSection delay={0}>
                        {children}
                    </AnimationSection>
                </ThemeProvider>
            </SessionProvider>
        </TRPCReactProvider>
    );
};

export default Providers;