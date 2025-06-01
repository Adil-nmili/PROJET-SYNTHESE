import { useState, useRef, useEffect } from "react";
import { CalendarIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HoverCardUser({ admin }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={cardRef}>
      <Button 
        variant="link"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <User />
      </Button>

      {isHovered && (
        <div className="absolute right-0 z-50 w-80 p-4 mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="flex justify-between space-x-4 w-full">
            <div className="space-y-1 w-full">
              <div className="flex items-center justify-between gap-2 w-full">
                <h4 className="text-sm font-semibold dark:text-slate-900">
                  {admin.first_name} {admin.last_name}
                </h4>
                <h3 className="text-sm font-semibold uppercase underline text-blue-500 dark:text-slate-900">
                  {admin.role}
                </h3>
              </div>
              <p className="text-sm dark:text-slate-900">{admin.email}</p>
              <div className="flex items-center pt-2">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-xs text-gray-500 dark:text-slate-900">
                  Joined {admin.created_at.split("T")[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
