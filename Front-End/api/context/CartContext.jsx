import React, { createContext, useState, useEffect, useContext } from 'react';
import { useClientContext } from './ClientContext';
import { toast } from 'react-hot-toast';
import CartService from '../../service/Cart';

// Coupon types
const COUPON_TYPES = {
  PERCENTAGE: 'percentage',
  FIXED_AMOUNT: 'fixed_amount',
  FREE_SHIPPING: 'free_shipping'
};

// Demo coupons (in a real app, these would come from the backend)
const DEMO_COUPONS = {
  'WELCOME15': { type: COUPON_TYPES.PERCENTAGE, value: 15, minPurchase: 50 },
  'SAVE20': { type: COUPON_TYPES.PERCENTAGE, value: 20, minPurchase: 100 },
  'FREESHIP': { type: COUPON_TYPES.FREE_SHIPPING, value: 0, minPurchase: 75 },
  'FLAT10': { type: COUPON_TYPES.FIXED_AMOUNT, value: 10, minPurchase: 30 }
};

export const CartContext = createContext({
  cart: null,
  cartCount: 0,
  fetchCart: () => {},
  addToCart: (productId, quantity, color) => {},
  removeFromCart: (itemId) => {},
  clearCart: () => {},
  updateCartCount: () => {},
  updateQuantity: (itemId, quantity) => {},
  applyCoupon: (code) => {},
  removeCoupon: () => {},
  coupon: null,
  discount: 0,
  discountType: null,
  discountValue: 0,
  isFreeShipping: false
});

export default function CartProvider({ children }) {
  const { client } = useClientContext();
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState(null);
  const [discountValue, setDiscountValue] = useState(0);
  const [isFreeShipping, setIsFreeShipping] = useState(false);

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

  const calculateSubtotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => 
      sum + (item.product?.price || 0) * item.quantity, 0
    );
  };

  const validateCoupon = (code, subtotal) => {
    const couponData = DEMO_COUPONS[code];
    if (!couponData) {
      throw new Error('Invalid coupon code');
    }
    if (subtotal < couponData.minPurchase) {
      throw new Error(`Minimum purchase amount of $${couponData.minPurchase} required`);
    }
    return couponData;
  };

  const applyCoupon = (code) => {
    try {
      const subtotal = calculateSubtotal();
      const couponData = validateCoupon(code, subtotal);
      
      setCoupon(code);
      setDiscountType(couponData.type);
      setDiscountValue(couponData.value);

      switch (couponData.type) {
        case COUPON_TYPES.PERCENTAGE:
          setDiscount(couponData.value / 100);
          setIsFreeShipping(false);
          toast.success(`${couponData.value}% discount applied!`);
          break;
        case COUPON_TYPES.FIXED_AMOUNT:
          setDiscount(couponData.value / subtotal);
          setIsFreeShipping(false);
          toast.success(`$${couponData.value} discount applied!`);
          break;
        case COUPON_TYPES.FREE_SHIPPING:
          setDiscount(0);
          setIsFreeShipping(true);
          toast.success('Free shipping applied!');
          break;
        default:
          throw new Error('Invalid coupon type');
      }
    } catch (error) {
      toast.error(error.message);
      removeCoupon();
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setDiscount(0);
    setDiscountType(null);
    setDiscountValue(0);
    setIsFreeShipping(false);
    toast.success('Coupon removed');
  };

  const calculateDiscount = (subtotal) => {
    if (!discountType) return 0;

    switch (discountType) {
      case COUPON_TYPES.PERCENTAGE:
        return subtotal * (discountValue / 100);
      case COUPON_TYPES.FIXED_AMOUNT:
        return Math.min(discountValue, subtotal);
      case COUPON_TYPES.FREE_SHIPPING:
        return 0;
      default:
        return 0;
    }
  };

  const calculateShipping = () => {
    return isFreeShipping ? 0 : 7.5;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const discountAmount = calculateDiscount(subtotal);
    return subtotal + shipping - discountAmount;
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
      updateQuantity,
      applyCoupon,
      removeCoupon,
      coupon,
      discount,
      discountType,
      discountValue,
      isFreeShipping,
      calculateSubtotal,
      calculateDiscount,
      calculateShipping,
      calculateTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);