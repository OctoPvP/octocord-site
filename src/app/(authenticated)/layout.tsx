import AnimateLeave from "@/app/components/framer/leave/animate-leave";
import AdminPanelLayout from "@/components/dashboard/layout/admin-panel-layout";
import { env } from "@/env";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dev = env.NODE_ENV === "development";
  return (
    <AdminPanelLayout>
      {dev ? children : ( // breaks HMR
        <AnimateLeave>
          {children}
        </AnimateLeave>
      )}
    </AdminPanelLayout>
  )
}