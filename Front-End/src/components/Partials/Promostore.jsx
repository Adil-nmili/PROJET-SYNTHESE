import React from 'react';
import { Link } from 'react-router-dom';
import { ALLPRODUCTS } from '../../router/Router';
const Promostore = () => {

  return (
    <div className="relative bg-[#FAF1DF] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Images à différentes positions */}
      <img src="/storePromoImage/image3.png" alt="Hat 1" className="absolute top-10 left-10 w-55" />
      <img src="/storePromoImage/image4.png" alt="Shirt 1" className="absolute top-5 left-1/3 w-40" />
      <img src="/storePromoImage/image7.png" alt="Jersey 1" className="absolute bottom-10 left-1/4 w-55" />
      <img src="/storePromoImage/image6.png" alt="Jersey 2" className="absolute top-16 right-1/6 w-96" />
      <img src="/storePromoImage/image5.png" alt="Shorts" className="absolute top-10 right-10 w-100" />
      <img src="/storePromoImage/image8.png" alt="Hat 2" className="absolute bottom-10 right-10 w-50" />

      {/* Texte au centre */}
      <div className="text-center z-10">
        <h1 className="text-4xl font-bold mb-4">Get 50% Off</h1>
        <p className="text-gray-600 mb-6">for all new product purchases<br />min. purchase Rp. 350.000</p>
        <Link to={ALLPRODUCTS}>
        <button className="bg-white text-black py-2 px-6 rounded-full hover:bg-gray-800 hover:text-white transition">SHOP NOW</button>
        </Link>
      </div>
    </div>
  );
};

export default Promostore;
