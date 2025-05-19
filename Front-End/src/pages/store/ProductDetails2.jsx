import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Product from "../../../service/Product.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { ALLPRODUCTS, LOGINSTORE, PRODUCT_DETAIL } from "../../router/Router";
import { Button } from "../../components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useClientContext } from "../../../api/context/ClientContext";
import { useCartContext } from "../../../api/context/CartContext";
import AlertSimple from "../../components/Partials/AlertSimple";

// Custom styles for Swiper
const swiperStyles = {
  ".similar-products-swiper": {
    padding: "20px 0",
    "& .swiper-button-next, & .swiper-button-prev": {
      color: "#F59E0B",
      "&:after": {
        fontSize: "24px",
      },
    },
    "& .swiper-pagination-bullet": {
      background: "#F59E0B",
      "&.swiper-pagination-bullet-active": {
        background: "#F59E0B",
      },
    },
  },
};

const ProductDetails2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("description");
  const [addingToCart, setAddingToCart] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [colors, setColors] = useState([]);
  const [errors, setErrors] = useState(false);

  const { authenticated, client } = useClientContext();
  const { addToCart } = useCartContext();

  useEffect(() => {
    authenticated ? fetchProductData() : navigate(LOGINSTORE);
  }, [id, authenticated]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      if (id) {
        const response = await Product.getById(id);
        const productData = response.data;
        setProduct(productData);
        // Parse colors if they're stored as a JSON string
        if (
          productData.colors &&
          typeof productData.colors === "string" &&
          productData.images.length > 0 &&
          typeof productData.images === "string"
        ) {
          try {
            const colors = JSON.parse(productData.colors);
            const images = JSON.parse(productData.images);
            if (colors && colors.length > 0) {
              setColors(colors);
              setSelectedColor(colors[0]);
            }
            if (images && images.length > 0) {
              setImages(images);
            }
          } catch (e) {
            console.error("Error parsing colors:", e);
            // If parsing fails, try to use the colors as is
            if (productData.colors.length > 0) {
              setSelectedColor(productData.colors[0]);
            }
          }
        } else if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }

        // Fetch similar products
        const similarResponse = await Product.getSimilarProducts(
          productData.category_id
        );
        setSimilarProducts(similarResponse.data);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  // Logic to add to cart
  const handleAddToCart = async () => {
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    setAddingToCart(true);
    try {
      await addToCart(product.id, quantity, selectedColor);
      setIsAddedToCart(true);
      setErrors(false);
    } catch (error) {
      setErrors(true);
      toast.error("Failed to add item to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  useEffect(() => {
    if (isAddedToCart) {
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 2000);
    }
  }, [isAddedToCart]);

  const handleRedirect = () => {
    navigate(ALLPRODUCTS);
  };

  const handleSimilarProductClick = (productId) => {
    // Reset states when navigating to a new product
    setLoading(true);
    setSelectedImage(0);
    setQuantity(1);
    setTab("description");

    // Navigate to the new product
    navigate(PRODUCT_DETAIL(productId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-purple-900 border-t-yellow-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Product not found</div>
      </div>
    );
  }

  const totalPrice = product.price * quantity;

  return (
    <div className="bg-gray-50 min-h-[100vh] relative pt-20 p-8 flex flex-col items-center gap-4">
      <div className="text-right pr-26 w-full">
        <Button onClick={handleRedirect}>
          <ArrowBigLeft />
          All Product
        </Button>
      </div>
      {/* Product Main Card */}
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg p-8 w-full max-w-5xl mb-8">
        {/* Image Gallery */}
        <div className="flex flex-col items-center md:w-1/2">
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="w-64 h-64 object-contain rounded-xl mb-4 border"
          />
          <div className="flex gap-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumb"
                className={`w-14 h-14 object-contain rounded-lg border cursor-pointer ${
                  selectedImage === idx
                    ? "border-yellow-400"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(idx)}
              />
            ))}
          </div>
        </div>
        {/* Product Info */}
        <div className="md:w-1/2 md:pl-10 flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-400 font-medium mb-1">{product.brand}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-semibold">${product.price}</span>
              <span className="flex text-yellow-400">
                {"★".repeat(Math.floor(product.rating || 0))}
                {"☆".repeat(5 - Math.floor(product.rating || 0))}
              </span>
              <span className="text-gray-500 ml-2">
                ({product.rating || 0})
              </span>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-4 border-b mb-2">
            {["description", "details", "comments"].map((t) => (
              <button
                key={t}
                className={`pb-2 px-2 capitalize font-medium ${
                  tab === t
                    ? "border-b-2 border-yellow-400 text-black"
                    : "text-gray-400"
                }`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="min-h-[60px] text-gray-700">
            {tab === "description" && <p>{product.description}</p>}
            {tab === "details" && <p>{product.details}</p>}
            {tab === "comments" && (
              <ul className="space-y-1">
                {product.comments?.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">{c.user}:</span>
                    <span>{c.comment}</span>
                    <span className="text-yellow-400">
                      {"★".repeat(c.rating)}
                    </span>
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
                {colors?.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="block text-xs text-gray-400">QUANTITY</span>
              <input
                type="number"
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded px-2 py-1 w-16"
              />
            </div>
            <div>
              <span className="block text-xs text-gray-400">TOTAL PRICE</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex gap-2 mt-4">
            <Button
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg flex-1 transition"
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              {addingToCart ? "ADDING..." : "ADD TO CART"}
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-lg">
              ♡
            </Button>
          </div>
          {/* Stock/Shipping Info */}
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <span>✔</span>
            <span>{product.shipping || "Free shipping available"}</span>
          </div>
        </div>
      </div>
      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="w-full max-w-5xl mb-8">
          <h3 className="text-lg font-bold mb-4">Similar Products</h3>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="similar-products-swiper"
            style={swiperStyles[".similar-products-swiper"]}
          >
            {similarProducts.map((prod) => (
              <SwiperSlide key={prod.id}>
                <div
                  className="bg-white rounded-xl shadow p-3 flex flex-col items-center cursor-pointer hover:shadow-lg transition h-full"
                  onClick={() => handleSimilarProductClick(prod.id)}
                >
                  <img
                    src={JSON.parse(prod.images)[0]}
                    alt="Product image"
                    className="w-32 h-32 object-contain mb-2"
                  />
                  <span className="font-semibold text-sm text-center mb-1 truncate w-full">
                    {prod.name}
                  </span>
                  <span className="text-yellow-400 font-bold">
                    ${prod.price}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ProductDetails2;
