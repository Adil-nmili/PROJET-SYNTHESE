import {
  ArrowDownUp,
  Home,
  LogOut,
  ShoppingCart,
  SquarePlus,
  User,
  Users,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

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

export function AppSidebar() {
  const location = useLocation();

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
        <SidebarContent>
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
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={"/admin"}
                      className={` ${
                        location.pathname === "/admin"
                          ? "bg-slate-800 text-gray-100"
                          : ""
                      }`}
                    >
                      <User />
                      <span>Admins</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {/* ////////////////////////// */}
          <SidebarGroup>
            <SidebarGroupLabel>Product</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={"/products"}
                      className={` ${
                        location.pathname === "/products"
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
                      to={"/products/new"}
                      className={` ${
                        location.pathname === "/products/new"
                          ? "bg-slate-800 text-gray-100"
                          : ""
                      }`}
                    >
                      <SquarePlus />
                      <span>New Product</span>
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
                      to={"/users"}
                      className={` ${
                        location.pathname === "/users"
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
                      to={"/orders"}
                      className={` ${
                        location.pathname === "/orders"
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
          <Button>
            <LogOut />
            <span>Logout</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
