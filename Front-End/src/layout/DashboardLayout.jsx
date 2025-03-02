import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import Nav from "../components/Partials/Nav";

function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-gray-50 h-screen w-full">
        <Nav />
        {children}
      </main>
    </SidebarProvider>
  );
}

export default DashboardLayout;
