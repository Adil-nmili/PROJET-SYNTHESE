import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_DETAIL, ALLPRODUCTS } from '../../router/Router';
import StoreNav from '../../components/Partials/StoreNav';

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Remonter en haut de la page
    axios.get('http://127.0.0.1:8000/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error("Erreur lors de la récupération des catégories :", error));

    axios.get('http://127.0.0.1:8000/api/sub-categorie')
      .then(response => setSubcategories(response.data))
      .catch(error => console.error("Erreur lors de la récupération des sous-catégories :", error));

    axios.get('http://localhost:8000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error("Erreur lors de la récupération des produits :", error));
  }, []);

  const handleCategoryClick = (category) => {
    localStorage.setItem('selectedCategory', JSON.stringify(category));
    setSelectedCategory(category); // pour affichage direct
    navigate(ALLPRODUCTS); // ou retirer si on veut rester ici
  };

  const handleSubcategoryClick = (subcategory) => {
    localStorage.setItem('selectedSubcategory', JSON.stringify(subcategory));
    navigate(ALLPRODUCTS);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category_id === selectedCategory.id : true;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <StoreNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="container mx-auto px-4 py-8 mt-28">
        <h1 className="text-4xl font-bold text-center mb-12">All Categories</h1>

        {/* Grille des catégories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col items-center">
              <div
                className="group relative w-[300px] h-[300px] bg-white rounded-xl overflow-hidden shadow-md cursor-pointer transition duration-500 hover:shadow-xl"
                onClick={() => handleCategoryClick(category)}
              >
                <img
                  src={category.image || "/images/default.jpg"}
                  alt={category.name}
                  className="w-full  object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition duration-300 group-hover:bg-black/40">
                  <h2 className="text-3xl font-semibold text-white transition-all duration-300 group-hover:scale-105 text-center">
                    {category.name}
                  </h2>
                </div>
              </div>

              {/* Sous-catégories */}
              <div className="p-4 w-full text-center space-y-2 mt-2">
                {subcategories
                  .filter(sub => sub.category_id === category.id)
                  .map(sub => (
                    <p
                      key={sub.id}
                      className="text-gray-600 hover:text-purple-600 cursor-pointer transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubcategoryClick(sub);
                      }}
                    >
                      {sub.name}
                    </p>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Produits filtrés */}
        {selectedCategory && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Products in {selectedCategory.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => navigate(PRODUCT_DETAIL(product.id))}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition hover:-translate-y-1 hover:shadow-lg cursor-pointer relative"
                >
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -35%
                  </span>
                  <img
                    src={JSON.parse(product.images)[0]}
                    alt={product.name}
                    className="w-32 h-32 object-contain mb-4"
                  />
                  <button className="bg-black text-white w-full py-2 rounded mb-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition">
                    🛒 Add To Cart
                  </button>
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCategories;
