import { useState, useEffect, useRef } from "react"
import { User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { LOGINSTORE, REGISTERSTORE } from "@/router/Router"
import { Button } from "../ui/button";

export function DropDownLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        onClick={toggleDropdown}
        variant={'outline'}
        className=""
      >
        <User className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 text-center font-semibold text-gray-700 border-b">
            Login To Your Account
          </div>
          
          <div className="px-2 py-2 flex flex-col gap-2">
            <Button
              className=""
              onClick={() =>{
                navigate(LOGINSTORE)
                setIsOpen(false)
              }}
            >
              Login
            </Button>
            <Button
              className=""
              onClick={() =>{
                navigate(REGISTERSTORE)
                setIsOpen(false)
              }}
            >
              Register
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
