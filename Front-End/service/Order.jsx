import { axiosClient } from "../api/axios"

const Order = {
    getCSRFToken: async () => {
        return await axiosClient.get("/sanctum/csrf-cookie")
    },
    getAll: async () => {
        return axiosClient.get('/api/orders')
    },
    create: async (payload) => {
        return axiosClient.post('/api/orders', payload)
    },
    update: async (id, payload) => {
        return axiosClient.put(`/api/orders/${id}`, payload)
    },
    delete: async (id) => {
        return axiosClient.delete(`/api/orders/${id}`)
    },
    getById: async (id) => {
        return axiosClient.get(`/api/orders/${id}`)
    },
    getUserOrders: async (userId) => {
        return axiosClient.get(`/api/users/${userId}/orders`)
    },
    
    // Checkout methods for the new checkout process
    // Create a new order from the cart and billing information
    checkout: async (billingInfo) => {
        return axiosClient.post('/api/checkout', billingInfo);
    },
    
    // Process payment for an order
    processPayment: async (orderId, paymentData) => {
        return axiosClient.post(`/api/orders/${orderId}/payment`, paymentData);
    },
    
    // Apply a coupon code
    applyCoupon: async (couponCode) => {
        return axiosClient.post('/api/coupons/apply', { code: couponCode });
    }
}

export default Order