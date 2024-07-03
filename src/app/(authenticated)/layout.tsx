import AnimateLeave from "@/app/components/framer/leave/animate-leave";
import AdminPanelLayout from "@/components/dashboard/admin-panel-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminPanelLayout>
      <AnimateLeave>
        {children}
      </AnimateLeave>
    </AdminPanelLayout>
  )
}