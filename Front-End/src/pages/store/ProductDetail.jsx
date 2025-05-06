import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Erreur lors de la récupération du produit.');
        setLoading(false);
      });
  }, [id]);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <p>Produit non trouvé.</p>;

  // Traitement des données JSON
  const images = JSON.parse(product.images || '[]');
  const colors = JSON.parse(product.colors || '[]');
  const sizes = JSON.parse(product.sizes || '[]');
  const price = parseFloat(product.price);

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl flex flex-col md:flex-row mt-20 shadow-2xl">
      {/* Images du produit */}
      <div className="flex-1 flex items-center justify-center p-6">
        <img
          src={images[0]}
          alt={product.name}
          className="max-h-96 object-contain"
        />
      </div>

      {/* Détails du produit */}
      <div className="flex-1 p-6 space-y-4">
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-400 text-sm">Tinners House</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-800">${price.toFixed(2)}</p>
          <div className="text-yellow-400 text-lg">★★★★☆</div>
        </div>

        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger className="text-gray-500" value="description">Description</TabsTrigger>
            <TabsTrigger className="text-gray-500" value="details">Détails</TabsTrigger>
            <TabsTrigger className="text-gray-500" value="comments">Commentaires</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-4">
            <p className="text-gray-600 text-sm">
              {product.description}
            </p>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <p className="text-gray-600 text-sm">
              Code produit : {product.product_code}
            </p>
            <p className="text-gray-600 text-sm">
              Catégorie ID : {product.category_id}
            </p>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <p className="text-gray-600 text-sm">
              Aucun commentaire pour le moment.
            </p>
          </TabsContent>
        </Tabs>

        {/* Options du produit */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <label className="block text-gray-500 mb-1">Couleurs</label>
            <div className="flex space-x-2">
              {colors.map((color, index) => (
                <span
                  key={index}
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                ></span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-500 mb-1">Tailles</label>
            <div className="flex space-x-2">
              {sizes.map((size, index) => (
                <span
                  key={index}
                  className="px-2 py-1 border rounded"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-500 mb-1">Quantité</label>
            <div className="flex items-center border px-2 py-1 rounded-md w-fit space-x-4">
              <button onClick={decrement} className="text-lg cursor-pointer">-</button>
              <span>{quantity}</span>
              <button onClick={increment} className="text-lg cursor-pointer">+</button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-500 mb-1">Prix total</label>
          <p className="font-bold">${(price * quantity).toFixed(2)}</p>
        </div>

        <div className="space-y-3">
          <button className="w-full border border-gray-300 py-2 rounded-md font-medium hover:bg-gray-100">
            ♡ Ajouter à ma liste de souhaits
          </button>
          <button className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-500">
            Ajouter au panier
          </button>
          <p className="text-green-600 text-sm flex items-center gap-1">🚚 Livraison gratuite pour vous</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
