import React from 'react';
import { Search } from "lucide-react";

const Nav = () => {
  return (
    <nav className="bg-[#552582] text-white p-4 fixed top-0 left-0 right-0 z-10 h-20 flex justify-between items-center px-6">
      <img src="logo2.png" alt="Logo" className="h-10" />
      <button className="bg-[#FDBB30] rounded-[6px] p-2 flex items-center gap-1">
        <Search size={18} /> Search
      </button>
    </nav>
  );
};

export default Nav;
