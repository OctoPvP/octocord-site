import BaseLayout from "@/app/base";
import { SiteNav } from "@/components/navbar";



const nav = [
  {
    title: "Dashboard",
    link: "/dashboard",
    checkExact: true
  },
  {
    title: "D1",
    link: "/features",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav nav={nav} />
      {children}
    </>
  )
}