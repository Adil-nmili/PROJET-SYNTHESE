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
    getClientOrders: async (clientId) => {
        return axiosClient.get(`/api/clients/${clientId}/orders`)
    },
    getShippingAddress: async (orderId) => {
        return axiosClient.get(`/api/shipping-address/${orderId}`)
    },
    updateShippingAddress: async (orderId, addressData) => {
        return axiosClient.put(`/api/shipping-address/${orderId}`, addressData)
    },
    getLastOrderId: async () => {
        try {
            const response = await axiosClient.get('/api/orders/last-id');
            return response;
        } catch (error) {
            console.error('Error getting last order ID:', error);
            throw error;
        }
    }
}

export default Order 