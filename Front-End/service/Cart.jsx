import { axiosClient } from "../api/axios"

const CartService = {
    getCart: async () => {
        return axiosClient.get('/api/cart');
    },
    
    addToCart: async (product_id, quantity = 1, selected_size = null, selected_color = null) => {
        return axiosClient.post('/api/cart/add', {
            product_id,
            quantity,
            selected_size,
            selected_color
        });
    },
    
    updateQuantity: async (itemId, quantity) => {
        return axiosClient.put(`/api/cart/update/${itemId}`, { quantity });
    },
    
    removeItem: async (itemId) => {
        return axiosClient.delete(`/api/cart/remove/${itemId}`);
    },
    
    clearCart: async () => {
        return axiosClient.delete('/api/cart/clear');
    }
};

export default CartService;