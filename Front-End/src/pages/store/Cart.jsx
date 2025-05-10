import { useState, useEffect } from 'react';
import CartService from '../../../service/Cart';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Minus, Plus, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CHECKOUT } from '../../router/Router'; 

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await CartService.getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Could not load your cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setUpdating(true);
      await CartService.updateQuantity(itemId, newQuantity);
      await fetchCart();
      toast.success('Cart updated');
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Could not update quantity. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setUpdating(true);
      await CartService.removeItem(itemId);
      await fetchCart(); 
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Could not remove item. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        setUpdating(true);
        await CartService.clearCart();
        await fetchCart(); 
        toast.success('Cart cleared');
      } catch (error) {
        console.error('Error clearing cart:', error);
        toast.error('Could not clear cart. Please try again.');
      } finally {
        setUpdating(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 mt-32 min-h-[70vh] flex items-center justify-center">
        <div className="text-purple-900 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-900 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
          <p className="text-xl">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 mt-32 min-h-[70vh]">
        <div className="max-w-3xl mx-auto text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any Lakers gear to your cart yet.
          </p>
          <Link to="/store">
            <Button 
              className="bg-purple-900 hover:bg-purple-800 text-white"
              size="lg"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

 
  const cartTotal = cart.items?.reduce(
    (total, item) => total + item.quantity * item.product?.price,
    0
  ) || 0;

  return (
    <div className="container mx-auto px-4 py-16 mt-32 min-h-[70vh]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <ShoppingBag className="mr-2" /> Your Cart
          </h1>
          <div className="flex gap-4">
            <Link to="/store">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft size={16} className="mr-2" /> Continue Shopping
              </Button>
            </Link>
            {cart.items?.length > 0 && (
              <Button 
                variant="destructive" 
                className="flex items-center" 
                onClick={handleClearCart}
                disabled={updating}
              >
                <Trash2 size={16} className="mr-2" /> Clear Cart
              </Button>
            )}
          </div>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-4 px-6 text-left">Product</th>
                  <th className="py-4 px-6 text-center">Size</th>
                  <th className="py-4 px-6 text-center">Color</th>
                  <th className="py-4 px-6 text-center">Quantity</th>
                  <th className="py-4 px-6 text-right">Price</th>
                  <th className="py-4 px-6 text-right">Subtotal</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cart.items?.map((item) => {
                  const itemImages = item.product?.images 
                    ? JSON.parse(item.product.images) 
                    : [];
                  const imageUrl = itemImages.length > 0 ? itemImages[0] : '/logo.png';
                  
                  return (
                    <tr key={item.id}>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <img 
                            src={imageUrl} 
                            alt={item.product?.name} 
                            className="w-16 h-16 object-cover rounded-md mr-4"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900">{item.product?.name}</h3>
                            <p className="text-gray-500 text-sm">Code: {item.product?.product_code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {item.selected_size || 'N/A'}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {item.selected_color || 'N/A'}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center">
                          <button 
                            className="bg-gray-200 hover:bg-gray-300 p-1 rounded-l-md"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={updating || item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="bg-gray-100 py-1 px-3 font-medium">
                            {item.quantity}
                          </span>
                          <button 
                            className="bg-gray-200 hover:bg-gray-300 p-1 rounded-r-md"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={updating}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        ${item.product?.price?.toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-right font-medium">
                        ${(item.quantity * item.product?.price)?.toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={updating}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Cart Summary */}
          <div className="p-6 bg-gray-50">
            <div className="max-w-md ml-auto">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between mb-6">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-bold text-purple-900">${cartTotal.toFixed(2)}</span>
              </div>
              <Link to={CHECKOUT}>
                <Button 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-md"
                  disabled={updating}
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
