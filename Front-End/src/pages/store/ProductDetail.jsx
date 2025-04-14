import { useEffect, useState } from 'react';
import jerseyImg from '../../../public/images/ImageLakers.jpg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ProductDetail() {
    const [quantity, setQuantity] = useState(0);

    const increment = () => {
        setQuantity(prev => prev + 1);
    };

    const decrement = () => {
        setQuantity(prev => (prev > 0 ? prev - 1 : 0)); // Prevent negative
    };

    return (
        <div className='flex-row'>
            <div className="max-w-6xl mx-auto bg-white rounded-xl flex flex-col md:flex-row mt-20">
                <div className="flex-1 flex items-center justify-center p-6">
                    <img src={jerseyImg} alt="Lakers Jersey" className="max-h-96" />
                </div>

                <div className="flex-1 p-6 space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold">Jersey Lakers</h2>
                        <p className="text-gray-400 text-sm">Tinners House</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-gray-800">$420</p>
                        <div className="text-yellow-400 text-lg">★★★★☆</div>
                    </div>

                    <Tabs defaultValue="description">
                        <TabsList>
                            <TabsTrigger className="text-gray-500" value="description">Description</TabsTrigger>
                            <TabsTrigger className="text-gray-500" value="Details">Details</TabsTrigger>
                            <TabsTrigger className="text-gray-500" value="orders">Comments</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="space-y-4">
                            <p className="text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                <span className="text-blue-500 cursor-pointer">read more</span>
                            </p>
                        </TabsContent>

                        <TabsContent value="Details" className="space-y-4">
                            <p className="text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                <span className="text-blue-500 cursor-pointer">read more</span>
                            </p>
                        </TabsContent>
                    </Tabs>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <label className="block text-gray-500 mb-1">Color</label>
                            <div className="w-5 h-5 rounded-full bg-yellow-400"></div>
                        </div>

                        <div>
                            <label className="block text-gray-500 mb-1">Quantity</label>
                            <div className="flex items-center border px-2 py-1 rounded-md w-fit space-x-4">
                                <button onClick={decrement} className="text-lg">-</button>
                                <span>{quantity}</span>
                                <button onClick={increment} className="text-lg">+</button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-500 mb-1">Total Price</label>
                            <p className="font-bold">${420 * quantity}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button className="w-full border border-gray-300 py-2 rounded-md font-medium hover:bg-gray-100">
                            ♡ Add to my wishlist
                        </button>
                        <button className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-500">
                            Add to cart
                        </button>
                        <p className="text-green-600 text-sm flex items-center gap-1">🚚 Livraison gratuite pour vous</p>
                    </div>
                </div>

            </div>





            {/* Similar Products */}
            <div className="max-w-6xl mx-auto mt-16 space-y-8 px-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Similar Products</h2>
                    <button className="text-sm text-gray-500 hover:underline">See All</button>
                </div>

                <div className="flex space-x-4 overflow-x-auto pb-4">
                    {[
                        { title: "ASUS FHD Gaming Laptop", price: "$960", oldPrice: "$1160", badge: "-35%", image: jerseyImg },
                        { title: "IPS LCD Gaming Monitor", price: "$1160", image: jerseyImg },
                        { title: "HAVIT HV-G92 Gamepad", price: "$560", badge: "NEW", image: jerseyImg },
                        { title: "AK-900 Wired Keyboard", price: "$200", image: jerseyImg },
                    ].map((item, index) => (
                        <div key={index} className="w-48 bg-white border rounded-lg p-3 shadow-sm relative">
                            {item.badge && (
                                <span className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium ${item.badge === "NEW" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                    }`}>
                                    {item.badge}
                                </span>
                            )}
                            <img src={item.image} alt={item.title} className="h-32 mx-auto object-contain" />
                            <p className="text-sm font-semibold mt-2">{item.title}</p>
                            <div className="text-orange-400 text-sm mt-1">★★★★★ <span className="text-gray-400 text-xs">(65)</span></div>
                            <p className="mt-1 text-sm font-bold">{item.price} <span className="line-through text-gray-400 font-normal">{item.oldPrice}</span></p>
                        </div>
                    ))}
                </div>

                {/* Item Reviews */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-bold mb-4">Item reviews</h2>
                    <div className="space-y-6">
                        {[
                            {
                                user: "Joumana Elmassouab",
                                review: "the jersey is quite warm and is simple and elegant",
                                rating: 4,
                            },
                            {
                                user: "Hiba_user1",
                                review: "The item is quite good",
                                rating: 3,
                            }
                        ].map((r, idx) => (
                            <div key={idx}>
                                <p className="font-semibold">{r.user}</p>
                                <div className="text-yellow-400 text-sm mb-1">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                                <p className="text-sm text-gray-600">{r.review}</p>
                            </div>
                        ))}
                    </div>

                    {/* Put a Review */}
                    <div className="mt-6">
                        <input
                            type="text"
                            placeholder="Put a review"
                            className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                        />
                    </div>
                </div>
            </div>

        </div>

    );
}

export default ProductDetail;
