import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import Nav from "../components/Partials/Nav";
import { Outlet, useNavigate } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAdminContext } from "../../api/context/AdminContext";
import { ThemeProvider  } from '../components/theme-provider'


function DashboardLayout() {
  const {
    authenticated,
    admin
    
} = useAdminContext();
const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    if (authenticated === true) {
        setIsLoading(false);
    } else {
        navigate('/login');
    }
}, [authenticated, isLoading]);

if (isLoading) {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <Loader className="animate-spin" />
        </div>
    );
}
  return (
   
    <ThemeProvider defaultTheme="dark" storageKey="dashboard-theme">
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-gray-50 dark:bg-slate-900 min-h-screen w-full relative">
        <Nav />
        <Outlet />
      </main>
      <Toaster />
    </SidebarProvider>
    </ThemeProvider>
  );
}

export default DashboardLayout;
