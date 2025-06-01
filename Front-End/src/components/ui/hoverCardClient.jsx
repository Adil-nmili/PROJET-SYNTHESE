import { CalendarIcon, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useClientContext } from "../../../api/context/ClientContext";
import { Button } from "@/components/ui/button";

export function HoverCardClient() {
  const { logout, client } = useClientContext();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Close card when clicking outside
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!client) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'N/A';
    }
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 100); // Small delay for better UX
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <div 
      className="relative" 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <Button 
        variant="ghost" 
        size="icon"
        className="hover:bg-slate-900 hover:text-white transition-colors focus-visible:ring-0 focus-visible:outline-none"
      >
        <User className="h-5 w-5" />
      </Button>

      {/* Hover Card Content */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-80 bg-white  rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50 transition-all duration-200 ease-in-out"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex flex-col space-y-4">
            {/* User Info Section */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900 ">
                {client.first_name} {client.last_name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {client.email}
              </p>
            </div>

            {/* Join Date Section */}
            <div className="flex items-center text-sm text-gray-600 ">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Joined {formatDate(client.created_at)}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
