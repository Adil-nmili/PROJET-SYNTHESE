import { SidebarTrigger } from "../ui/sidebar";
import { useLocation } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import { useAdminContext } from "../../../api/context/AdminContext";
import { User } from "lucide-react";
import { HoverCardUser } from "../ui/hoverCardUser";

function Nav() {
  const location = useLocation();
  const path = location.pathname.slice(10).replaceAll('/',' > ');
  const letterSpacing = {
    letterSpacing: "2px",
  };
  // const admin = JSON.parse(window.localStorage.getItem('ADMIN'))

  return (
    <nav className="bg-white dark:bg-slate-800 h-16 px-16 w-full flex items-center gap-10 z-50 shadow-md">
      <div className="absolute left-1">
        <SidebarTrigger />
      </div>
      <ul className="flex gap-10" style={letterSpacing}>
        <h2 className="capitalize font-semibold ">
          Dashboard {path}
          {/* {path === "dashboard" ? "" : ` > ${path}`} */}
        </h2>
      </ul>
      <div className="absolute right-4 flex items-center gap-2">
      {/* <HoverCardUser admin={admin} /> */}
      <ModeToggle />
      </div>
    </nav>
  );
}

export default Nav;
