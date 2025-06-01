import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { CART, PRODUCT_DETAIL, STORE } from "../../router/Router";
import { DropDownLogin } from "./DropDownLogin";
import { useClientContext } from "../../../api/context/ClientContext";
import { HoverCardClient } from "../ui/hoverCardClient";
import { useCartContext } from "../../../api/context/CartContext";
import Product from "../../../service/Product";
import { useSearchParams } from "react-router-dom";

const StoreNav = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { authenticated, client } = useClientContext();
  const { cartCount, fetchCart } = useCartContext();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCart();
    };

    window.addEventListener('cart-updated', handleCartUpdate);

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fetchCart]);

  useEffect(() => {
    const searchProducts = async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await Product.getAll();
        if (response.data) {
          const filteredProducts = response.data.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase())
          ).slice(0, 5);
          setSearchResults(filteredProducts);
        }
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setShowResults(false);
    setSearchParams({ search: searchTerm });
    navigate(`/store?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleProductClick = (product) => {
    setShowResults(false);
    navigate(PRODUCT_DETAIL(product.id));
  };

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
          <div ref={searchRef} className="relative w-77">
            <form onSubmit={handleSearch} className="relative">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pr-10" 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {isSearching ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </button>
            </form>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div 
                className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50"
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${import.meta.env.VITE_BACKEND_URL}/${searchResults[0].image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="flex items-center justify-between p-3 hover:bg-gray-50/80 cursor-pointer border-b border-gray-100 last:border-b-0 backdrop-blur-sm"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{product.name}</p>
                      <p className="text-sm text-purple-600">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button 
            className="mx-2 relative" 
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