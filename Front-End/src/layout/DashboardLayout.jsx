import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import Nav from "../components/Partials/Nav";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-gray-50 h-screen w-full">
        <Nav />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default DashboardLayout;
