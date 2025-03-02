import { SidebarTrigger } from "../ui/sidebar";
import { useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const letterSpacing = {
    letterSpacing: "2px",
  };

  return (
    <nav className="bg-white h-16 px-16 relative w-full flex items-center gap-10 ">
      <div className="absolute left-1">
        <SidebarTrigger />
      </div>
      <ul className="flex gap-10" style={letterSpacing}>
        <h2 className="capitalize font-semibold">
          Dashboard
          {path === "dashboard" ? "" : ` > ${path}`}
        </h2>
      </ul>
    </nav>
  );
}

export default Nav;
