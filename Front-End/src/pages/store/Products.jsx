import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Grid, List, Heart, Star, ShoppingCart, Eye, Zap, Sparkles, TrendingUp, Award } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());
  const containerRef = useRef(null);

  // Mock navigation
  const navigate = (path) => console.log('Navigate to:', path);
  const addToCart = (productId, quantity) => console.log('Add to cart:', productId, quantity);

  // Mock data
  useEffect(() => {
    const mockCategories = [
      { id: 1, name: "Sports Jerseys", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
      { id: 2, name: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
      { id: 3, name: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
      { id: 4, name: "Sportswear", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400" }
    ];

    const mockSubcategories = [
      { id: 1, name: "Basketball", category_id: 1 },
      { id: 2, name: "Football", category_id: 1 },
      { id: 3, name: "Sneakers", category_id: 2 },
      { id: 4, name: "Watches", category_id: 3 }
    ];

    const mockProducts = [
      {
        id: 1,
        name: "Premium Lakers Jersey #23",
        price: 299,
        old_price: 399,
        rating: 4.8,
        reviews: 124,
        category_id: 1,
        sousCategorie_id: 1,
        images: '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"]',
        isNew: true,
        isTrending: true,
        discount: 25
      },
      {
        id: 2,
        name: "Designer Basketball Sneakers",
        price: 459,
        old_price: 599,
        rating: 4.9,
        reviews: 89,
        category_id: 2,
        sousCategorie_id: 3,
        images: '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"]',
        isNew: false,
        isTrending: true,
        discount: 23
      },
      {
        id: 3,
        name: "Luxury Sports Watch",
        price: 899,
        old_price: 1199,
        rating: 5.0,
        reviews: 67,
        category_id: 3,
        sousCategorie_id: 4,
        images: '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"]',
        isNew: true,
        isTrending: false,
        discount: 25
      },
      {
        id: 4,
        name: "Professional Training Gear",
        price: 180,
        old_price: 250,
        rating: 4.6,
        reviews: 156,
        category_id: 4,
        sousCategorie_id: null,
        images: '["https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400"]',
        isNew: false,
        isTrending: true,
        discount: 28
      },
      {
        id: 5,
        name: "Elite Performance Shirt",
        price: 120,
        old_price: 160,
        rating: 4.4,
        reviews: 92,
        category_id: 4,
        sousCategorie_id: null,
        images: '["https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400"]',
        isNew: false,
        isTrending: false,
        discount: 25
      },
      {
        id: 6,
        name: "Premium Sports Sunglasses",
        price: 320,
        old_price: 450,
        rating: 4.7,
        reviews: 78,
        category_id: 3,
        sousCategorie_id: 4,
        images: '["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400"]',
        isNew: true,
        isTrending: false,
        discount: 29
      }
    ];

    setCategories(mockCategories);
    setSubcategories(mockSubcategories);
    setProducts(mockProducts);

    // Check for selected category from localStorage
    const storedCategory = localStorage.getItem('selectedCategory');
    if (storedCategory) {
      setSelectedCategory(JSON.parse(storedCategory));
      localStorage.removeItem('selectedCategory');
    }
  }, []);

  const getImageUrl = (images) => {
    try {
      return JSON.parse(images)[0];
    } catch {
      return images;
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory?.id === category.id ? null : category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(selectedSubcategory?.id === subcategory.id ? null : subcategory);
  };

  const toggleWishlist = (productId, e) => {
    e.stopPropagation();
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    addToCart(productId, 1);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category_id === selectedCategory.id : true;
    const matchesSubcategory = selectedSubcategory ? product.sousCategorie_id === selectedSubcategory.id : true;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.isNew - a.isNew;
      default: return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 mt-12">
      
      {/* Hero Section with Selected Category */}
      {selectedCategory && (
        <div className="relative h-80 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={selectedCategory.image}
              alt={selectedCategory.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          </div>
          
          <div className="relative h-full flex items-center justify-center text-center text-white">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <Award size={16} />
                <span className="font-medium">Premium Collection</span>
              </div>
              <h1 className="text-6xl font-black tracking-tight">
                {selectedCategory.name}
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Discover our exclusive selection of premium {selectedCategory.name.toLowerCase()} 
                crafted for champions
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Search and Filter Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search premium products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-500"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-purple-500 transition-all duration-300"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rating</option>
                <option value="newest">Newest First</option>
              </select>

              {/* View Toggle */}
              <div className="flex bg-white/80 backdrop-blur-sm rounded-xl border-2 border-gray-200 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List size={20} />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105"
              >
                <Filter size={18} />
                Filters
              </button>
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <span>{sortedProducts.length} premium products found</span>
            {(selectedCategory || selectedSubcategory) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                }}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        {filterOpen && (
          <div className="mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles size={20} className="text-purple-600" />
              Shop by Category
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={`group relative px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory?.id === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                      : 'bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {category.name}
                  {selectedCategory?.id === category.id && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full opacity-20 blur"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Subcategories */}
            {selectedCategory && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-md font-semibold mb-3 text-gray-700">Refine by:</h4>
                <div className="flex flex-wrap gap-2">
                  {subcategories
                    .filter(sub => sub.category_id === selectedCategory.id)
                    .map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubcategoryClick(sub)}
                        className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
                          selectedSubcategory?.id === sub.id
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 hover:bg-purple-100 text-gray-700'
                        }`}
                      >
                        {sub.name}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div
                key={product.id}
                className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 ${
                  viewMode === 'list' ? 'flex items-center p-6 gap-6' : 'p-6'
                }`}
                onClick={() => navigate(`/product/${product.id}`)}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Badges */}
                <div className="absolute top-4 left-4 z-10 space-y-2">
                  {product.isNew && (
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-xs font-bold rounded-full">
                      NEW
                    </span>
                  )}
                  {product.isTrending && (
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <TrendingUp size={12} />
                      HOT
                    </span>
                  )}
                </div>

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{product.discount}%
                    </div>
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className="absolute top-4 right-16 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100"
                >
                  <Heart 
                    size={18} 
                    className={`transition-colors ${
                      wishlist.has(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                    }`} 
                  />
                </button>

                {/* Product Image */}
                <div className={`relative overflow-hidden rounded-2xl mb-4 ${
                  viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'h-64'
                }`}>
                  <img
                    src={getImageUrl(product.images)}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Quick Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => handleAddToCart(e, product.id)}
                        className="px-6 py-3 bg-white/95 backdrop-blur-sm text-gray-800 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                      <button className="p-3 bg-white/95 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-3 flex-1">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={`${i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    {product.old_price && (
                      <span className="text-lg text-gray-400 line-through">
                        ${product.old_price}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur -z-10"></div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-600">No products found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {searchTerm 
                    ? `We couldn't find any products matching "${searchTerm}"` 
                    : "Try adjusting your filters to see more results"
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;