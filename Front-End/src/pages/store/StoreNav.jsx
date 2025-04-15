import React from 'react';
import { Link } from 'react-router-dom';

const StoreNav = () => {
  return (
    <nav className="bg-[#552582] text-white p-4 fixed top-0 left-0 right-0 z-50 h-20 flex justify-between items-center px-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img src="/logo2.png" alt="Ballers Nation Logo" className="h-12" />
        </Link>
        <img src="/basketball.png" alt="Basketball" className="h-8 w-8" />
      </div>
      <div className="flex items-center gap-4">
        <Link to="/cart" className="text-white hover:text-[#FDBB30] transition-colors">
          Cart
        </Link>
        <Link to="/account" className="text-white hover:text-[#FDBB30] transition-colors">
          Account
        </Link>
      </div>
    </nav>
  );
};

export default StoreNav; 