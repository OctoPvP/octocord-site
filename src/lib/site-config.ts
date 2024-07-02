import { type Metadata } from "next";

export type NavConfig = {
    title: string;
    link: string;
    checkExact?: boolean;
    className?: string | ((isActive?: boolean) => string);
}[]
export type SiteConfig = {
    title: string;
    description: string;
} & Metadata;
export const siteConfig: SiteConfig = {
    title: "OctoCord",
    description: "Web dashboard for OctoCord",
};