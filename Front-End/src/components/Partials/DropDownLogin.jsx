import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import { Link } from "react-router-dom"
import { LOGINSTORE, REGISTERSTORE } from "@/router/Router"
export function DropDownLogin() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ms-2">
            <User className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-center font-semibold text-gray-700">Login To Your Accout</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <Link
            className="w-full bg-green-500 py-2 text-center font-semibold text-gray-100 rounded-md shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300"
             to={LOGINSTORE}>Login</Link>
           
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Link
            className="w-full bg-yellow-500 py-2 text-center font-semibold text-gray-100 rounded-md shadow-md hover:bg-yellow-700 hover:shadow-lg transition-all duration-300"
             to={REGISTERSTORE}>Register</Link>
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
