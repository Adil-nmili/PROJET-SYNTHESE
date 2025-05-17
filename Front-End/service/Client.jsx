import { axiosClient } from "../api/axios"


const ClientApi = {
    getCSRFToken: async () => {
        return await axiosClient.get("/sanctum/csrf-cookie") 
    },
    getClient:  () => {
        return axiosClient.get('/api/clients')
    },
    getClientById:  (id) => {
        return axiosClient.get(`/api/clients/${id}`)
    },
    deleteClient:  (id) => {
        return axiosClient.delete(`/api/clients/${id}`)
    },
    updateClient: async (id, payload) => {
        return axiosClient.put(`/api/clients/${id}`, payload)
    },
    addClient: async (payload) => {
        return axiosClient.post('/api/clients', payload)
    },
    login: async (payload) => {
        return axiosClient.post('/api/clients/login', payload)
    },
}

export default ClientApi