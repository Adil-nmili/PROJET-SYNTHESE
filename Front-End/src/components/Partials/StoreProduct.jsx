import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { Button } from '../ui/button';
import { ALLPRODUCTS, ALL_CATEGORIES } from '../../router/Router';

function StoreProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des catégories :", error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    // Stocker la catégorie sélectionnée dans le localStorage
    localStorage.setItem('selectedCategory', JSON.stringify(category));
    // Rediriger vers la page des produits
    navigate(ALLPRODUCTS);
  };

  return (
    <div>
      {/* Section Best Selling */}
      <section className="bg-white p-15 mt-10 rounded-2xl shadow-xl w-11/12 mx-auto overflow-hidden relative flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Bloc d'information */}
        <div className="flex flex-col items-start gap-4 max-w-sm">
          <h2 className="text-3xl font-extrabold text-gray-800">Best Selling Jersey</h2>
          <p className="text-lg text-gray-600">Los Angeles Lakers LeBron James #23 Icon Jersey</p>
          <div className="flex gap-4">
            <Link to={ALLPRODUCTS}>
              <Button className="group bg-[#7e57c2] flex gap-2 text-white px-6 py-3 rounded-full hover:bg-amber-50 hover:text-black transition">
                See more
                <ArrowRight size={24} className="text-white transition group-hover:text-black" />
              </Button>
            </Link>
            <Link to={ALL_CATEGORIES}>
              <Button className="group bg-[#7e57c2] flex gap-2 text-white px-6 py-3 rounded-full hover:bg-amber-50 hover:text-black transition">
                Browse Categories
                <ArrowRight size={24} className="text-white transition group-hover:text-black" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Premier produit */}
        <div className="flex flex-col items-center p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
          <img
            src="https://fanatics.frgimages.com/los-angeles-lakers/mens-fanatics-purple-los-angeles-lakers-2025-pacific-division-champions-locker-room-t-shirt_ss5_p-202900446+u-flgeofefcekzjigunfru+v-ajz9zpt7xzw9wjkavkey.jpg?_hv=2&w=400"
            alt="Jersey"
            className="w-64 h-64 object-cover rounded-lg"
          />
          <p className="mt-4 text-gray-700 font-semibold">JERSEY NUMBER 23 ICONIC</p>
          <strong className="text-[#7e57c2] text-[16px] mt-2">$ 1,400.00</strong>
        </div>

        {/* Deuxième produit */}
        <div className="flex flex-col items-center p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
          <img
            src="https://fanatics.frgimages.com/los-angeles-lakers/unisex-nike-dalton-knecht-gold-los-angeles-lakers-swingman-jersey_ss5_p-202683651+u-lj8esmxunpdwwpip2aw5+v-jx6kpehsk9oacgnw03cj.jpg?_hv=2&w=400"
            alt="Jersey"
            className="w-64 h-64 object-cover rounded-lg"
          />
          <p className="mt-4 text-gray-700 font-semibold">JERSEY NUMBER 23 ICONIC</p>
          <strong className="text-[#7e57c2] text-[16px] mt-2">$ 1,400.00</strong>
        </div>
      </section>

      {/* Section Categories */}
      <div className="p-15 mt-10 bg-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold">Categories</h2>
          <p className="text-gray-600 text-lg">Find what you are looking for</p>
        </div>
        <div className="flex flex-wrap justify-center w-full h-[500px] relative gap-8 bg-[#7e57c2] px-5">
          {categories.length >= 3 && (
            <div className="flex justify-center gap-8 rounded-lg">
              {/* 1er bloc */}
              <div
                className="text-center cursor-pointer w-96 h-96 flex flex-col items-center"
                onClick={() => handleCategoryClick(categories[0])}
              >
                <div className="bg-white rounded-b-lg p-4 shadow-md hover:scale-105 transition-transform">
                  <img
                    src={categories[0].image}
                    alt={categories[0].name}
                    className="mx-auto mb-4 h-72 w-52 object-contain"
                  />
                </div>
                <h3 className="mt-4 font-semibold text-white">{categories[0].name}</h3>
              </div>

              {/* 2ème bloc (décalé en bas) */}
              <div
                className="text-center cursor-pointer w-100 flex flex-col items-center mt-10"
                onClick={() => handleCategoryClick(categories[1])}
              >
                <div className="bg-white rounded-lg p-4 shadow-md hover:scale-105 transition-transform h-84">
                  <img
                    src={categories[1].image}
                    alt={categories[1].name}
                    className="mx-auto mb-4 h-80 w-52"
                  />
                </div>
                <h3 className="mt-4 font-semibold text-white">{categories[1].name}</h3>
              </div>

              {/* 3ème bloc */}
              <div
                className="text-center cursor-pointer w-100 flex flex-col items-center"
                onClick={() => handleCategoryClick(categories[2])}
              >
                <div className="bg-white rounded-b-lg p-4 shadow-md hover:scale-105 transition-transform">
                  <img
                    src={categories[2].image}
                    alt={categories[2].name}
                    className="mx-auto mb-4 h-72 w-52 object-contain"
                  />
                </div>
                <h3 className="mt-4 font-semibold text-white">{categories[2].name}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoreProduct;
