import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_DETAIL } from '../../router/Router';
import StoreNav from '../../components/Partials/StoreNav';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from '../../components/ui/button';
import { BaggageClaim } from 'lucide-react';
import { useCartContext } from '../../../api/context/CartContext';
import Categorie from '../../../service/Categorie';
import SubCategoriesApi from '../../../service/SubCategorie';
import Product from '../../../service/Product';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCartContext();

  // Function to handle image URLs
  const getImageUrl = (images) => {
    if (!images) return '';
    
    try {
      // If images is a string, parse it
      let imageArray = images;
      if (typeof images === 'string') {
        imageArray = JSON.parse(images);
      }
      
      // Get the first image
      const firstImage = imageArray[0];
      
      // If it's a full URL, return it
      if (firstImage.startsWith('http://') || firstImage.startsWith('https://')) {
        return firstImage;
      }
      
      // Otherwise, it's a local path
      return import.meta.env.VITE_BACKEND_URL + '/' + firstImage;
    } catch (error) {
      console.error('Error processing image:', error);
      return '';
    }
  };

  // Function to handle category image URLs
  const getCategoryImageUrl = (imagePath) => {
    console.log(imagePath)
    if (!imagePath) return '/images/default.jpg';
    
    // If it's a full URL (starts with http or https)
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it's a local storage path
    return import.meta.env.VITE_BACKEND_URL + '/storage/' + imagePath;
  };

  useEffect(() => {
    // Récupérer la catégorie sélectionnée du localStorage
    const storedCategory = localStorage.getItem('selectedCategory');
    const storedSubcategory = localStorage.getItem('selectedSubcategory');

    if (storedCategory) {
      setSelectedCategory(JSON.parse(storedCategory));
      // Nettoyer le localStorage après récupération
      localStorage.removeItem('selectedCategory');
    }

    if (storedSubcategory) {
      setSelectedSubcategory(JSON.parse(storedSubcategory));
      // Nettoyer le localStorage après récupération
      localStorage.removeItem('selectedSubcategory');
    }

    // Charger les catégories
     Categorie.getAll()
      .then(response => setCategories(response.data))
      .catch(error => console.error("Erreur lors de la récupération des catégories :", error));

    // Charger les sous-catégories
    SubCategoriesApi.getAll()
      .then(response => setSubcategories(response.data))
      .catch(error => console.error("Erreur lors de la récupération des sous-catégories :", error));

    // Charger les produits
    Product.getAll()
      .then(response => setProducts(response.data))
      .catch(error => console.error("Erreur lors de la récupération des produits :", error));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category_id === selectedCategory.id : true;
    const matchesSubcategory = selectedSubcategory ? product.sousCategorie_id === selectedSubcategory.id : true;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation(); // Prevent navigation to product details
    try {
      await addToCart(productId, 1, "default"); // Add default color
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <StoreNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {/* Bannière de la catégorie sélectionnée */}
      {selectedCategory && (
        <div className="w-full h-[300px] relative mt-5 overflow-hidden rounded-lg">
          <img
            src={getCategoryImageUrl(selectedCategory.image)}
            alt={selectedCategory.name}
            className="w-full h-full object-contain"
           
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white text-center">
              {selectedCategory.name} 
            </h1>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          {selectedCategory ? `Products in ${selectedCategory.name}` : 
           selectedSubcategory ? `Products in ${selectedSubcategory.name}` : 
           'All Products'}
        </h1>

        {/* Filtres */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <HoverCard key={category.id}>
                <HoverCardTrigger asChild>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory?.id === category.id
                        ? 'bg-[#7e57c2] text-white'
                        : 'bg-white hover:bg-purple-100 text-gray-800'
                    }`}
                  >
                    {category.name}
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{category.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {subcategories
                        .filter(sub => sub.category_id === category.id)
                        .map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => handleSubcategoryClick(sub)}
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                              selectedSubcategory?.id === sub.id
                                ? 'bg-[#7e57c2] text-white'
                                : 'bg-gray-100 hover:bg-purple-100 text-gray-800'
                            }`}
                          >
                            {sub.name}
                          </button>
                        ))}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div 
                key={product.id}
                onClick={() => navigate(PRODUCT_DETAIL(product.id))}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              >
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -35%
                </span>
                <img
                  src={getImageUrl(product.images)}
                  alt={product.name}
                  className="w-32 h-32 object-contain mb-4"
                />
                <Button 
                  onClick={(e) => handleAddToCart(e, product.id)} 
                  className="bg-black text-white w-full py-2 rounded mb-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition"
                >
                  <BaggageClaim/> Add To Cart
                </Button>
                <p className="font-medium text-sm text-center">{product.name}</p>
                <div className="flex justify-center items-center gap-2 mt-1">
                  <span className="text-red-600 font-semibold">{product.price} DH</span>
                  {product.old_price && (
                    <span className="line-through text-gray-400 text-sm">
                      DH{product.old_price}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500">
              {searchTerm ? `No products found for "${searchTerm}"` : "No products found."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;