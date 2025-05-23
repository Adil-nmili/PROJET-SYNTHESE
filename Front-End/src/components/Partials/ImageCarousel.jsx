import React, { useEffect, useState } from "react";
import "../../css/product.css";
import axios from "axios"; // tu avais oublié l'import de axios
import { useNavigate } from "react-router-dom"; // si tu utilises react-router
import { PRODUCT_DETAIL } from "../../router/Router";

export default function ImageCarousel() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // pour naviguer au clic

  const repeatedProduct = [...products, ...products];

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des products :", error);
      });
  }, []);

  const handleClick = (productId) => {
    navigate(PRODUCT_DETAIL(productId));
  };

  return (
    <div className="w-full overflow-hidden bg-white py-4">
      <div className="slider">
        <div className="slide-track">
          {repeatedProduct.map((product, index) => (
            <div className="slide" key={index}>
              <img
                src={JSON.parse(product.images)[0]} 
                alt={product.name || `Product ${index + 1}`}
                className="h-20 w-auto max-w-[120px] object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
                onClick={() => handleClick(product.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
