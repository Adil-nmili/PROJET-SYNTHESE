import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ClientContext, { useClientContext } from './ClientContext';
import { axiosClient } from '../axios';
import { toast } from 'react-hot-toast';

export const CartContext = createContext({
  cart: null,
  fetchCart: () =>{},
  addToCart: (productId,clientId, quantity, color) =>{},
  removeFromCart: (itemId) =>{}
});

export default function CartProvider({ children }) {
    const { token } = useClientContext();
    const [cart, setCart] = useState(null);

    const fetchCart = async () => {
        const res = await axiosClient.get('/api/cart', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data);
    };

    const addToCart = async (productId, quantity = 1, color) => {
        await axiosClient.post('/api/cart/add', { product_id: productId, quantity, color }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchCart();
    };

    const removeFromCart = async (itemId = null) => {
        await axiosClient.delete(`/api/cart/${itemId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchCart();
    };

    useEffect(() => {
        if (token) fetchCart();
    }, [token]);  

    return (
        <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCartContext = () => useContext(CartContext)