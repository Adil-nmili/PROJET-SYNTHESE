import {
    ArrowDownUp,
    BoxSelectIcon,
    Home,
    LogOut,
    ShoppingCart,
    SquarePlus,
    User,
    Users,
  } from "lucide-react";
  
  import { Link, useLocation, useNavigate } from "react-router-dom";
  
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
  } from "./ui/sidebar";
  import { Button } from "./ui/button";
  
  import Logo2 from "../../public/asset/logo2.jpeg";
import { useAdminContext } from "../../api/context/AdminContext";
  
  export function AppSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAdminContext();
  
    const handleLogout = () => {
      logout();
      navigate("/login");
    }
  
    return (
      <div className="bg-slate-900 text-white h-screen">
        <Sidebar>
          <SidebarHeader>
            <Link
              to={"/"}
              className=" text-center flex items-center justify-center  w-full"
            >
              <img src={Logo2} className="w-28" />
            </Link>
          </SidebarHeader>
          <SidebarContent style={{scrollbarWidth: "none"}}>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={"/dashboard"}
                        className={` ${
                          location.pathname === "/dashboard"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <Home />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Admins</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={"/dashboard/admins"}
                        className={` ${
                          location.pathname === "/dashboard/admins"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <User />
                        <span>Admins</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={"/dashboard/admins/new"}
                        className={` ${
                          location.pathname === "/dashboard/admins/new"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <SquarePlus />
                        <span>New Admin</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {/* ////////////////////////// */}
            <SidebarGroup>
              <SidebarGroupLabel>Products</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={"/dashboard/products"}
                        className={` ${
                          location.pathname === "/dashboard/products"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <ShoppingCart />
                        <span>Products</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={"/dashboard/products/new"}
                        className={` ${
                          location.pathname === "/dashboard/products/new"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <SquarePlus />
                        <span>New Product</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={"/dashboard/categories"}
                        className={` ${
                          location.pathname === "/dashboard/categories"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <BoxSelectIcon />
                        <span>Categories</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Utilisateurs</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={"/dashboard/users"}
                        className={` ${
                          location.pathname === "/dashboard/users"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <Users />
                        <span>Utilisateurs</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Orders</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={"/dashboard/orders"}
                        className={` ${
                          location.pathname === "/dashboard/orders"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <ArrowDownUp />
                        <span>Orders</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="pb-4">
            <Button onClick={handleLogout}>
              <LogOut />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
      </div>
    );
  }
  