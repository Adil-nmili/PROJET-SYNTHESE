import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { User } from "lucide-react";

const StoreNav = ({SearchTerm,setSearchTerm}) => {
  return (
    <nav className="h-32  w-screen flex flex-col fixed top-0 left-0 items-center z-50 shadow-md border-b-2 border-gray-400">
      <div className="bg-purple-900 py-2 h-1/3 w-full flex items-center justify-end pe-16">
        <p className="text-gray-200 font-normal">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <Link to="/store" className="text-white font-normal ms-2 underline">
            Shop Now
          </Link>
        </p>
      </div>
      <div className=" bg-white h-2/3 w-full flex items-center justify-end">
        <div className="flex items-center justify-end pe-16">
          <div className="relative w-77">
            <Input type="text" placeholder="Search..." className="w-full" 
            value={SearchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
             />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <Button className="ms-2" variant="outline">
            <ShoppingCart className="w-4 h-4" />
          </Button>
          <Button className="ms-2" variant="outline">
            <User className="w-4 h-4" />
          </Button>
        </div>
      
      </div>
      <img src="/logo.png" alt="logo" className="w-24 object-cover h-24 absolute top-1/2 left-16  -translate-y-1/2" />
    </nav>
  );
};

export default StoreNav;
