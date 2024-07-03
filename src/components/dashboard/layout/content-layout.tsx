import { AnimationSection } from "@/app/components/framer/animation-context";
import { AnimateLeaveItem } from "@/app/components/framer/leave/animate-leave";
import { Navbar } from "@/components/dashboard/layout/navbar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getMenuList } from "@/lib/menu-list";
import { headers } from "next/headers";
import Link from "next/link";

interface ContentLayoutProps {
  title?: string;
  children: React.ReactNode;
  extraBreadcrumb?: React.ReactNode | React.ReactNode[];
}

export function ContentLayout({ title, children, ...props }: ContentLayoutProps) {
  const pathname: string = headers().get("x-pathname") ?? "/dashboard";
  // console.log("pn", pathname)
  const menuConfig = getMenuList(pathname);
  // find the active submenu. if none is found find the active menu
  type BreadcrumbPath = {
    label: string;
    link?: string;
  }[];
  const breadcrumbPath: BreadcrumbPath = [];
  const found = menuConfig.find((m) => {
    const { groupLabel, menus } = m;
    // console.log({ groupLabel, menus })
    if (!groupLabel) return false;
    return menus.find((menu) => {
      const found = menu.submenus.find((submenu) => submenu.active);
      if (found) {
        if (groupLabel) breadcrumbPath.push({ label: groupLabel });
        breadcrumbPath.push({ label: menu.label, link: menu.href });
        breadcrumbPath.push({ label: found.label, link: found.href });
        return true;
      }
      if (menu.active) {
        if (groupLabel) breadcrumbPath.push({ label: groupLabel });
        breadcrumbPath.push({ label: menu.label, link: menu.href });
        return true;
      }
      return false;
    });
  });
  // build a path from the current pathname
  const path = pathname.split("/");
  return (
    <div>
      <Navbar title={title ?? breadcrumbPath[breadcrumbPath.length - 1]?.label ?? ""} />
      <AnimateLeaveItem className="container pt-8 pb-8 px-4 sm:px-8">
        <AnimationSection>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbPath.map((p, i) => {
                const isLast = i === path.length - 1;
                const isFirst = i === 0;
                return (
                  <>
                    {!isFirst && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {p.link && !isLast ? (
                        <BreadcrumbLink asChild>
                          <Link href={p.link}>{p.label}</Link>
                        </BreadcrumbLink>
                      ) : (
                        isLast ? <BreadcrumbPage>{p.label}</BreadcrumbPage> : p.label
                      )}
                    </BreadcrumbItem>
                  </>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
            <AnimationSection>
              {children}
            </AnimationSection>
        </AnimationSection>
      </AnimateLeaveItem>
    </div>
  );
}
