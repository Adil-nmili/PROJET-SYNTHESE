import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Categorie from '../../../service/Categorie';
import { ALLPRODUCTS } from '../../router/Router';

function CategorySection() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Categorie.getAll();
        const allCategories = response.data;
        console.log(response)
        // Sélectionner aléatoirement 2 catégories
        const shuffled = [...allCategories].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 2);
        setCategories(allCategories);
        setDisplayedCategories(selected);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
        }
      }
    };

    fetchCategories();
  }, []); 

  const handleCategoryClick = (category) => {
    // Sauvegarder la catégorie sélectionnée dans le localStorage
    localStorage.setItem('selectedCategory', JSON.stringify(category));
    // Naviguer vers la page des produits avec la catégorie sélectionnée
    navigate(ALLPRODUCTS);
  };

  return (
    <div className='w-full px-4 md:px-8 lg:px-16 py-8 md:py-10'>
      <h2 className="text-3xl font-bold text-center mb-16 text-black tracking-wider relative">
        <span className="relative z-10">Most Popular Categories</span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto'>
        {displayedCategories.map((category) => (
          <div 
            key={category._id}
            onClick={() => handleCategoryClick(category)}
            className="flex flex-col items-center p-3 md:p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group w-full max-w-sm mx-auto bg-white h-80" 
          >
            <div className="relative h-full overflow-hidden rounded-lg w-full">
              <img
                src={category.image}
                alt={`${category.name}'s Jersey`}
                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-base md:text-lg font-bold uppercase tracking-wider">
                  {category.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySection; 