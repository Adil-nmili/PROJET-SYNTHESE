import React from 'react';

const ProductParCategories = ({ category, subcategories, products }) => {
  return (
    <div className="px-10 py-20">
      {/* Image + Titre de la catégorie */}
      <div className="text-center mb-10">
        {category.image && (
          <img src={category.image} alt={category.name} className="mx-auto w-40 h-40 object-contain" />
        )}
        <h2 className="text-3xl font-bold mt-4">{category.name}</h2>
      </div>

      {/* Liste des sous-catégories */}
      {subcategories.map((sub) => (
        <div key={sub.id} className="mb-12">
          <h3 className="text-2xl font-semibold mb-4 text-orange-500">{sub.name}</h3>

          {/* Produits de cette sous-catégorie */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products
              .filter(product => product.sousCategorie_id === sub.id)
              .map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition hover:-translate-y-1 hover:shadow-lg">
                  <img
                    src={JSON.parse(product.images)[0]}
                    alt={product.name}
                    className="w-32 h-32 object-contain mb-4"
                  />
                  <p className="font-medium text-sm text-center">{product.name}</p>
                  <div className="flex justify-center items-center gap-2 mt-1">
                    <span className="text-red-600 font-semibold">{product.price} DH</span>
                    {product.old_price && (
                      <span className="line-through text-gray-400 text-sm">DH{product.old_price}</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductParCategories;
