import { axiosClient } from "../api/axios"


const CartService = {
    getCart: async (clientId) => {
       
        return axiosClient.get(`/api/cart/${clientId}`);
    },
    
    addToCart: async (data) => {
        return axiosClient.post('/api/cart/add', data);
    },
    
    updateQuantity: async (itemId, quantity) => {
        return axiosClient.put(`/api/cart/item/${itemId}`, { quantity });
    },
    
    removeItem: async (itemId) => {
        return axiosClient.delete(`/api/cart/item/${itemId}`);
    },
    
    clearCart: async (clientId) => {
    return axiosClient.delete(`/api/cart/clear/${clientId}`);
  },
};

export default CartService
