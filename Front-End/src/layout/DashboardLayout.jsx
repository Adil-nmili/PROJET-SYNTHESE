import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import Nav from "../components/Partials/Nav";
import { Outlet, useNavigate } from "react-router-dom";


import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAdminContext } from "../../api/context/AdminContext";

function DashboardLayout() {
  const {
    authenticated,
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
