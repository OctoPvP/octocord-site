import { SiteNav } from "@/components/navbar";

const nav = [
  {
    title: "Home",
    link: "/",
    checkExact: true, // check if the link is exactly the same as the current path
  },
  {
    title: "Features",
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