import React, { useEffect, useState, useRef } from "react";
import { ShoppingBag, Star, Heart, Zap, Sparkles } from "lucide-react";
import {Badge} from "@/components/ui/badge";

export default function ImageCarousel() {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  
  // Mock navigate function
  const navigate = (path) => {
    console.log('Navigate to:', path);
  };

  // Mock product data for demonstration
  useEffect(() => {
    // Simulate API call with mock data
    const mockProducts = [
      {
        id: 1,
        name: "Premium Sports Jersey",
        images: '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400"]',
        price: 299,
        rating: 4.8,
        isNew: true
      },
      {
        id: 2,
        name: "Designer Sneakers",
        images: '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"]',
        price: 459,
        rating: 4.9,
        isNew: false
      },
      {
        id: 3,
        name: "Luxury Watch",
        images: '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400"]',
        price: 899,
        rating: 5.0,
        isNew: true
      },
      {
        id: 4,
        name: "Designer Handbag",
        images: '["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"]',
        price: 650,
        rating: 4.7,
        isNew: false
      },
      {
        id: 5,
        name: "Premium Sunglasses",
        images: '["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"]',
        price: 320,
        rating: 4.6,
        isNew: true
      },
      {
        id: 6,
        name: "Athletic Jacket",
        images: '["https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"]',
        price: 180,
        rating: 4.4,
        isNew: false
      }
    ];
    
    setTimeout(() => {
      setProducts(mockProducts);
    }, 500);
  }, []);

  // Create seamless infinite array - more repetitions for truly smooth infinite effect
  const seamlessProducts = [...products, ...products, ...products, ...products, ...products];

  const handleClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleMouseEnter = (productId) => {
    setHoveredProduct(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  return (
    <div className="w-full py-10 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-12 px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-800 font-medium mb-4">
          <Zap size={16} className="animate-pulse" />
          <span>Trending Products</span>
          <Sparkles size={16} className="animate-pulse" />
        </div>
        <h2 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1">
          Featured Collection
        </h2>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of premium products that define luxury and style
        </p>
      </div>

      {/* Carousel Container with Perfect Seamless Overflow */}
      <div className="relative overflow-hidden">
        {/* Seamless Edge Blending */}
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent pointer-events-none z-20"></div>
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-slate-100 via-slate-100/80 to-transparent pointer-events-none z-20"></div>

        {/* Seamless Infinite Carousel Track */}
        <div 
          ref={carouselRef}
          className="flex gap-6 py-4 h-[450px] items-center"
          style={{
            animation: 'infiniteScroll 60s linear infinite',
            willChange: 'transform',
            width: 'max-content'
          }}
        >
          {seamlessProducts.map((product, index) => (
            <div
              key={`${product.id}-${Math.floor(index / products.length)}-${index % products.length}`}
              className="flex-shrink-0 group cursor-pointer"
              onClick={() => handleClick(product.id)}
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-72 h-9/12 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-3  p-6 border border-white/20">
                {/* Premium Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#07070D] to-[#D0D8D9] rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-700"></div>
                {/* Product Badge */}
                {product.isNew && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge  size={'sm'}>
                      NEW
                    </Badge>
                  </div>
                )}

                {/* Heart Icon */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-red-50 transition-colors">
                    <Heart 
                      size={16} 
                      className={`transition-colors duration-300 ${
                        hoveredProduct === product.id ? 'text-red-500 fill-current' : 'text-gray-600'
                      }`} 
                    />
                  </div>
                </div>

                {/* Enhanced Product Image with Parallax */}
                <div className="relative h-[200px] mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:shadow-inner transition-all duration-700">
                  <img
                    src={JSON.parse(product.images)[1]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    style={{ objectFit: 'cover' }}
                  />
                  
                  {/* Dynamic Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  
                  {/* Floating Quick Shop Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
                    <button className="px-4 py-1 bg-white/95 backdrop-blur-md text-gray-800 font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border border-white/50">
                      <div className="flex items-center gap-3">
                        <ShoppingBag size={16} />
                        <span className='text-sm'>Add to Cart</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={`${i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-2 bg-purple-100 hover:bg-purple-200 rounded-full transition-colors cursor-pointer">
                        <ShoppingBag size={16} className="text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Overlays for Perfect Seamless Effect */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-100 to-transparent pointer-events-none z-10"></div>
        
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-20%);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Smooth pause on hover */
        .flex:hover {
          animation-play-state: paused;
        }

        /* Enhanced shadow for premium feel */
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
      <div className="absolute bottom-0 w-full h-1.5 bg-gradient-to-r from-purple-900 to-pink-900"></div>
    </div>
  );
}