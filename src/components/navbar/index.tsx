
import { MainNav } from "@/components/navbar/main";
import { MobileNav } from "@/components/navbar/mobile";
import SignInButton from "@/components/navbar/sign-in-btn";
import { type NavConfig } from "@/lib/site-config";
import { getServerAuthSession } from "@/server/auth";

export async function SiteNav({ nav }: { nav: NavConfig }) {
  const session = await getServerAuthSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav nav={nav} />
        <MobileNav nav={nav} />
        <div className="flex flex-1 items-center space-x-2 justify-end">
          {/*<nav className="flex items-center">
            <ModeToggle />
          </nav>*/}
          <SignInButton session={session} />
        </div>
      </div>
    </header>
  );
}