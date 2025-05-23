import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { CART, STORE } from "../../router/Router";
import { DropDownLogin } from "./DropDownLogin";
import { useClientContext } from "../../../api/context/ClientContext";
import { HoverCardClient } from "../ui/hoverCardClient";
import { useCartContext } from "../../../api/context/CartContext";

const StoreNav = ({searchTerm, setSearchTerm, isSearching}) => {
  const navigate = useNavigate();
  const { authenticated, client } = useClientContext();
  const { cartCount } = useCartContext();

  return (
    <nav className="h-28 w-screen flex flex-col fixed top-0 left-0 items-center z-50 shadow-md border-b-2 border-gray-400">
      <div className="bg-purple-900 py-2 h-1/3 w-full flex items-center justify-end pe-16">
        <p className="text-gray-200 font-normal text-xs">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <Link to={STORE} className="text-white font-normal ms-1 underline">
            Shop Now
          </Link>
        </p>
      </div>
      <div className="bg-white h-2/3 w-full flex items-center justify-end">
        <div className="flex items-center justify-end pe-16">
          <div className="relative w-77">
            {/* <Input 
              type="text" 
              placeholder="Search..." 
              className="w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            /> */}
            {/* {isSearching ? (
              <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />
            ) : (
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
            )} */}
          </div>
          <Button 
            className="ms-2 relative" 
            variant="outline"
            onClick={() => navigate(CART)}
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Button>
          {
            authenticated ? (
              <HoverCardClient />
            ) : (
              <DropDownLogin />
            )
          }
        </div>
      </div>

      <img onClick={() => navigate(STORE)} src="/logo.png" alt="logo" className="w-16 cursor-pointer object-cover h-16 absolute top-1/2 left-16 -translate-y-1/2" />
    </nav>
  );
};

export default StoreNav;