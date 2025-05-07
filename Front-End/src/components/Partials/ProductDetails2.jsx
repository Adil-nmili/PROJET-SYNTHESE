import React, { useState } from 'react';

const mockProduct = {
  id: 1,
  name: 'Jersey Lakers',
  brand: 'Tinners House',
  price: 420,
  rating: 4.5,
  images: [
    'https://lakersstore.com/cdn/shop/files/AURORA_DR6380-734_PHSBH001-2000.jpg?v=1697134448&width=540',
    'https://lakersstore.com/cdn/shop/products/AR4887-557-a_0304874e-be4d-4a37-be3f-cac4204a3484.png?v=1611786251&width=1080',
    'https://lakersstore.com/cdn/shop/products/AR4887-109-a_7b6985a3-fd51-4bef-a8c8-2c9f25cebf07.png?v=1611786257&width=1080',
  ],
  colors: ['Yellow', 'White', 'Black'],
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis quam ac nulla blandit vehicula at vitae ipsum.',
  details: 'Material: 100% Polyester. Machine wash. Imported.',
  comments: [
    { user: 'John', comment: 'Great quality!', rating: 5 },
    { user: 'Anna', comment: 'Very comfortable.', rating: 4 },
  ],
  stock: 12,
  shipping: 'Livraison gratuite pour vous',
};

const mockSimilar = [
  { id: 2, name: 'K15-010 Gaming Laptop', price: 420, img: mockProduct.images[0] },
  { id: 3, name: 'K15-010 Gaming Monitor', price: 420, img: mockProduct.images[1] },
  { id: 4, name: 'BAW Hat', price: 420, img: mockProduct.images[2] },
  { id: 5, name: '4C-100 Wired Headphone', price: 420, img: mockProduct.images[0] },
];

const mockReviews = [
  { user: 'John', rating: 5, text: 'Awesome product!' },
  { user: 'Anna', rating: 4, text: 'Very good, but a bit expensive.' },
  { user: 'Mike', rating: 3, text: 'Average quality.' },
];

const ProductDetails2 = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0]);
  const [quantity, setQuantity] = useState(2);
  const [tab, setTab] = useState('description');

  const totalPrice = mockProduct.price * quantity;

  return (
    <div className="bg-gray-50 min-h-screen p-8 flex flex-col items-center">
      {/* Product Main Card */}
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg p-8 w-full max-w-5xl mb-8">
        {/* Image Gallery */}
        <div className="flex flex-col items-center md:w-1/2">
          <img
            src={mockProduct.images[selectedImage]}
            alt={mockProduct.name}
            className="w-64 h-64 object-contain rounded-xl mb-4 border"
          />
          <div className="flex gap-2">
            {mockProduct.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumb"
                className={`w-14 h-14 object-contain rounded-lg border cursor-pointer ${selectedImage === idx ? 'border-yellow-400' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(idx)}
              />
            ))}
          </div>
        </div>
        {/* Product Info */}
        <div className="md:w-1/2 md:pl-10 flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold">{mockProduct.name}</h2>
            <p className="text-gray-400 font-medium mb-1">{mockProduct.brand}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-semibold">${mockProduct.price}</span>
              <span className="flex text-yellow-400">
                {'★'.repeat(Math.floor(mockProduct.rating))}
                {'☆'.repeat(5 - Math.floor(mockProduct.rating))}
              </span>
              <span className="text-gray-500 ml-2">({mockProduct.rating})</span>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-4 border-b mb-2">
            {['description', 'details', 'comments'].map((t) => (
              <button
                key={t}
                className={`pb-2 px-2 capitalize font-medium ${tab === t ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-400'}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="min-h-[60px] text-gray-700">
            {tab === 'description' && <p>{mockProduct.description}</p>}
            {tab === 'details' && <p>{mockProduct.details}</p>}
            {tab === 'comments' && (
              <ul className="space-y-1">
                {mockProduct.comments.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">{c.user}:</span>
                    <span>{c.comment}</span>
                    <span className="text-yellow-400">{'★'.repeat(c.rating)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Color, Quantity, Total */}
          <div className="flex gap-4 items-center mt-2">
            <div>
              <span className="block text-xs text-gray-400">COLOR</span>
              <select
                className="border rounded px-2 py-1"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {mockProduct.colors.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            <div>
              <span className="block text-xs text-gray-400">QUANTITY</span>
              <input
                type="number"
                min={1}
                max={mockProduct.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded px-2 py-1 w-16"
              />
            </div>
            <div>
              <span className="block text-xs text-gray-400">TOTAL PRICE</span>
              <span className="font-semibold">${totalPrice}</span>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex gap-2 mt-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg flex-1 transition">ADD TO CART</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-lg">♡</button>
          </div>
          {/* Stock/Shipping Info */}
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <span>✔</span>
            <span>{mockProduct.shipping}</span>
          </div>
        </div>
      </div>
      {/* Similar Products */}
      <div className="w-full max-w-5xl mb-8">
        <h3 className="text-lg font-bold mb-2">Similar Products</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {mockSimilar.map((prod) => (
            <div key={prod.id} className="min-w-[160px] bg-white rounded-xl shadow p-3 flex flex-col items-center cursor-pointer hover:shadow-lg transition">
              <img src={prod.img} alt={prod.name} className="w-20 h-20 object-contain mb-2" />
              <span className="font-medium text-sm text-center mb-1">{prod.name}</span>
              <span className="text-yellow-400 font-bold">${prod.price}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Item Reviews */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold mb-4">Item reviews</h3>
        <ul className="space-y-3">
          {mockReviews.map((r, i) => (
            <li key={i} className="flex flex-col gap-1 border-b pb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{r.user}</span>
                <span className="text-yellow-400">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
              <span className="text-gray-700 text-sm">{r.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails2; 