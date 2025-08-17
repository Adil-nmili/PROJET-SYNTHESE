import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, ShoppingBag, TrendingUp, Sparkles } from 'lucide-react';

function StoreProduct() {
  // Mock navigation and data functions
  const navigate = (path) => console.log('Navigate to:', path);
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Basketball Jerseys",
      image: "https://fanatics.frgimages.com/los-angeles-lakers/mens-fanatics-purple-los-angeles-lakers-2025-pacific-division-champions-locker-room-t-shirt_ss5_p-202900446+u-flgeofefcekzjigunfru+v-ajz9zpt7xzw9wjkavkey.jpg?_hv=2&w=400"
    },
    {
      id: 2,
      name: "Football Gear",
      image: "https://fanatics.frgimages.com/los-angeles-lakers/unisex-nike-dalton-knecht-gold-los-angeles-lakers-swingman-jersey_ss5_p-202683651+u-lj8esmxunpdwwpip2aw5+v-jx6kpehsk9oacgnw03cj.jpg?_hv=2&w=400"
    },
    {
      id: 3,
      name: "Sports Accessories",
      image: "https://fanatics.frgimages.com/los-angeles-lakers/mens-fanatics-purple-los-angeles-lakers-2025-pacific-division-champions-locker-room-t-shirt_ss5_p-202900446+u-flgeofefcekzjigunfru+v-ajz9zpt7xzw9wjkavkey.jpg?_hv=2&w=400"
    }
  ]);
  const [isHovered, setIsHovered] = useState(null);

  const handleCategoryClick = (category) => {
    console.log('Category selected:', category);
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Hero Section with Best Selling */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full opacity-20 animate-bounce"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full text-amber-800 font-medium">
                <TrendingUp size={16} />
                <span>Trending Now</span>
                <Sparkles size={16} className="animate-pulse" />
              </div>
              
              <h1 className="text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                Best Selling
                <br />
                <span className="text-gray-800">Jersey Collection</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Los Angeles Lakers LeBron James #23 Icon Jersey
                <br />
                <span className="text-sm font-medium text-purple-600">✨ Limited Edition • Premium Quality</span>
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  onClick={() => navigate('/products')}
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-2">
                    <ShoppingBag size={20} />
                    Shop Collection
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                
                <button 
                  className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-bold rounded-full border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onClick={() => navigate('/categories')}
                >
                  <div className="flex items-center gap-2">
                    Browse Categories
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
            
            {/* Featured Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  image: "https://fanatics.frgimages.com/los-angeles-lakers/mens-fanatics-purple-los-angeles-lakers-2025-pacific-division-champions-locker-room-t-shirt_ss5_p-202900446+u-flgeofefcekzjigunfru+v-ajz9zpt7xzw9wjkavkey.jpg?_hv=2&w=400",
                  title: "JERSEY #23 ICONIC",
                  price: "$1,400.00",
                  rating: 5,
                  badge: "Bestseller"
                },
                {
                  image: "https://fanatics.frgimages.com/los-angeles-lakers/unisex-nike-dalton-knecht-gold-los-angeles-lakers-swingman-jersey_ss5_p-202683651+u-lj8esmxunpdwwpip2aw5+v-jx6kpehsk9oacgnw03cj.jpg?_hv=2&w=400",
                  title: "SWINGMAN EDITION",
                  price: "$1,200.00",
                  rating: 4,
                  badge: "New"
                }
              ].map((product, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  {/* Badge */}
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                      product.badge === 'Bestseller' ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-green-400 to-emerald-500'
                    }`}>
                      {product.badge}
                    </div>
                  </div>
                  
                  {/* Product Image */}
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className={`w-full h-[200px] object-cover transition-transform duration-500 ${
                        isHovered === index ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={`${i < product.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">(4.8)</span>
                    </div>
                    
                    <h3 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                      {product.title}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {product.price}
                      </span>
                      <button className="p-2 bg-purple-100 hover:bg-purple-200 rounded-full transition-colors">
                        <ShoppingBag size={18} className="text-purple-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-800 font-medium mb-6">
              <Sparkles size={16} />
              Explore Collections
            </div>
            <h2 className="text-5xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collections designed for every sports enthusiast
            </p>
          </div>
          
          {/* Categories Grid */}
          {categories.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {categories.slice(0, 3).map((category, index) => (
                <div
                  key={category.id}
                  className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${
                    index === 1 ? 'md:-translate-y-8' : ''
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-xl hover:shadow-2xl transition-all duration-500">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Category Image */}
                    <div className="relative p-8 pt-12">
                      <div className="relative overflow-hidden rounded-2xl">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                    
                    {/* Category Info */}
                    <div className="relative px-8 pb-8">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300 mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 mb-4">Premium quality gear</p>
                        
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          <span>Explore</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StoreProduct;