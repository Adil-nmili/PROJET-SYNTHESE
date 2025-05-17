import React, { createContext, useState, useEffect, useContext } from 'react';
import { useClientContext } from './ClientContext';
import { toast } from 'react-hot-toast';
import CartService from '../../service/Cart';

export const CartContext = createContext({
  cart: null,
  cartCount: 0,
  fetchCart: () => {},
  addToCart: (productId, quantity, color) => {},
  removeFromCart: (itemId) => {},
  clearCart: () => {},
  updateCartCount: () => {},
  updateQuantity: (itemId, quantity) => {}
});

export default function CartProvider({ children }) {
  const { client } = useClientContext();
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    try {
      if (!client?.id) {
        setCart(null);
        setCartCount(0);
        return;
      }
      const response = await CartService.getCart(client.id);
      setCart(response.data);
      updateCartCount(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart(null);
      setCartCount(0);
      toast.error('Failed to load cart');
    }
  };

  const updateCartCount = (cartData) => {
    if (!cartData?.items) {
      setCartCount(0);
      return;
    }
    const count = cartData.items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  const addToCart = async (productId, quantity = 1, color) => {
    try {
      if (!client?.id) {
        toast.error('Please login to add items to cart');
        return;
      }
      const data = {
        product_id: productId,
        quantity,
        color,
        client_id: client.id
      };
      const response = await CartService.addToCart(data);
      if (response.status === 201 || response.status === 409) {
        await fetchCart();
        toast.success(response.data.message || 'Item added to cart');
      } else {
        throw new Error(response.data.message || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.response?.data?.message || 'Failed to add item to cart');
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      if (!client?.id) {
        toast.error('Please login to remove items from cart');
        return;
      }
      await CartService.removeItem(itemId);
      await fetchCart();
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      if (!client?.id) {
        toast.error('Please login to update cart');
        return;
      }
      await CartService.updateQuantity(itemId, quantity);
      await fetchCart();
      toast.success('Cart updated');
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      if (!client?.id) {
        setCart(null);
        setCartCount(0);
        return;
      }
      await CartService.clearCart(client.id);
      setCart(null);
      setCartCount(0);
      window.dispatchEvent(new Event('cart-updated'));
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
      throw error;
    }
  };

  useEffect(() => {
    if (client?.id) {
      fetchCart();
    } else {
      setCart(null);
      setCartCount(0);
    }
  }, [client?.id]);

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartCount,
      fetchCart, 
      addToCart, 
      removeFromCart, 
      clearCart,
      updateCartCount,
      updateQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);