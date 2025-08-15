import React, { useState, useEffect } from 'react';
import { Search } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FooterNav from '@/components/Partials/FooterNav';
import Product from '../../../service/Product';
import { PRODUCT_DETAIL } from '../../router/Router';

const WebsiteNav = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Change background when scrolled more than 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch products when search is shown
  useEffect(() => {
    if (showSearch) {
      fetchProducts();
    }
  }, [showSearch]);

  // Filter products when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await Product.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = () => {
    setShowSearch(false);
    setSearchTerm('');
    setFilteredProducts([]);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-[70px] flex justify-between items-center px-6 transition-colors duration-300 
       bg-transparent text-white`}>
      <img src="logo2.png" alt="Logo" className="h-10" />
      <FooterNav isScrolled={isScrolled} />
      <div className="flex items-center gap-2 relative">
        {showSearch && (
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="px-3 py-2 text-white focus:outline-none bg-purple-900/50 border border-[#FDBB30] placeholder:text-white"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {/* Search Results Dropdown */}
            {filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 rounded-md shadow-lg max-h-60 overflow-y-auto " style={{scrollbarWidth:"none"}}>
                {filteredProducts.map((product) => (
                  <Link
                    key={product._id}
                    to={PRODUCT_DETAIL(product.id)}
                    onClick={handleProductClick}
                    className="flex items-center gap-2 p-2 hover:bg-slate-950 transition-colors duration-200"
                  >
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{product.name}</span>
                      <span className="text-xs text-gray-300">${product.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {isLoading && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-purple-900 rounded-md p-2 text-center">
                Loading...
              </div>
            )}
          </div>
        )}
        <Button 
          onClick={() => setShowSearch(!showSearch)}
          className="bg-[#FDBB30] text-black hover:bg-black hover:text-white rounded-[6px] transition-all duration-300 p-2 flex items-center hover:"
        >
          <Search size={18} /> Search
        </Button>
      </div>
    </nav>
  );
};

export default WebsiteNav;
