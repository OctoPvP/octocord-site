import { UserNav } from "@/components/dashboard/layout/user-nav";
import { SheetMenu } from "@/components/dashboard/layout/sheet-menu";
import { getServerAuthSession } from "@/server/auth";
import { AnimateLeaveItem } from "@/app/components/framer/leave/animate-leave";
import NavServerSelector from "@/components/dashboard/nav-server-selector";

interface NavbarProps {
  title: string;
}

export async function Navbar({ title }: NavbarProps) {
  const session = await getServerAuthSession();
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <AnimateLeaveItem fadeOnly className={""}>
            <h1 className="font-bold">{title}</h1>
          </AnimateLeaveItem>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end gap-4">
          <NavServerSelector />
          <UserNav session={session!} />
        </div>
      </div>
    </header>
  );
}
