import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: unknown;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(_pathname?: string): Group[] {
  const pathname = _pathname ?? "";
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          active: pathname.includes("/dashboard/posts"),
          icon: SquarePen,
          submenus: [
            {
              href: "/dashboard/posts",
              label: "All Posts",
              active: pathname === "/dashboard/posts"
            },
            {
              href: "/dashboard/posts/new",
              label: "New Post",
              active: pathname === "/dashboard/posts/new"
            }
          ]
        },
        {
          href: "/dashboard/categories",
          label: "Categories",
          active: pathname.includes("/dashboard/categories"),
          icon: Bookmark,
          submenus: []
        },
        {
          href: "/dashboard/tags",
          label: "Tags",
          active: pathname.includes("/dashboard/tags"),
          icon: Tag,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/dashboard/users",
          label: "Users",
          active: pathname.includes("/dashboard/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/dashboard/account",
          label: "Account",
          active: pathname.includes("/dashboard/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
