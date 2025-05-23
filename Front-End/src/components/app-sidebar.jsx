import {
    ArrowDownUp,
    BoxSelectIcon,
    Home,
    LogOut,
    ShoppingCart,
    SquarePlus,
    User,
    Users,
    FolderTree,
    Newspaper,
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
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "./ui/alert-dialog";
  
  import Logo2 from "../../public/asset/logo2.jpeg";
import { useAdminContext } from "../../api/context/AdminContext";
import { ADMIN, ADMIN_CREATE, CATEGORIES, DASHBOARD, NEWSFORM, ORDERS, PLAYERS, PRODUCT, PRODUCT_CREATE, SUBCATEGORIES, TEAMS, USER_DETAIL } from "../router/Router";
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
                        to={DASHBOARD}
                        className={` ${
                          location.pathname === DASHBOARD
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
                        to={ADMIN}
                        className={` ${
                          location.pathname === ADMIN
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
                        to={ADMIN_CREATE}
                        className={` ${
                          location.pathname === ADMIN_CREATE
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
            {/* ///////////////////////////////////// */}
            <SidebarGroup>
              <SidebarGroupLabel>Lakers</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={PLAYERS}
                        className={` ${
                          location.pathname === PLAYERS
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <User />
                        <span>Players</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={TEAMS}
                        className={` ${
                          location.pathname === TEAMS
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <SquarePlus />
                        <span>Teams</span>
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
                        to={PRODUCT}
                        className={` ${
                          location.pathname === PRODUCT
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
                        to={PRODUCT_CREATE}
                        className={` ${
                          location.pathname === PRODUCT_CREATE
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
                        to={CATEGORIES}
                        className={` ${
                          location.pathname === CATEGORIES
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <BoxSelectIcon />
                        <span>Categories</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={SUBCATEGORIES}
                        className={` ${
                          location.pathname === SUBCATEGORIES
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <FolderTree />
                        <span>Sub-categories</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>News</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={PRODUCT}
                        className={` ${
                          location.pathname === PRODUCT
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <Newspaper />
                        <span>News Articales</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={NEWSFORM}
                        className={` ${
                          location.pathname === NEWSFORM
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <SquarePlus />
                        <span>New Article</span>
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
                        to={USER_DETAIL}
                        className={` ${
                          location.pathname === USER_DETAIL
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
                        to={ORDERS}
                        className={` ${
                          location.pathname === ORDERS
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>
                  <LogOut />
                  <span>Logout</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will need to login again to access the dashboard.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SidebarFooter>
        </Sidebar>
      </div>
    );
  }
  