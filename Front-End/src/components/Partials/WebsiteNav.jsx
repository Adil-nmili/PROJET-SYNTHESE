import React, { useState } from 'react';
import { Search } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const WebsiteNav = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="bg-purple-950 text-white p-4 fixed top-0 left-0 right-0 z-50 h-[70px] flex justify-between items-center px-6">
      <img src="logo2.png" alt="Logo" className="h-10" />
      <div className="flex items-center gap-2">
        {showSearch && (
          <Input
            type="text"
            placeholder="Search..."
            className="px-3 py-2  text-white   focus:outline-none"
          />
        )}
        <Button 
          onClick={() => setShowSearch(!showSearch)}
          className="hover:bg-[#FDBB30] rounded-[6px] transition-all duration-300 p-2 flex items-center "
        >
          <Search size={18} /> Search
        </Button>
      </div>
    </nav>
  );
};

export default WebsiteNav;
