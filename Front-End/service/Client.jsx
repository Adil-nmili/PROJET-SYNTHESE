import { axiosClient } from "../api/axios"


const ClientApi = {
    getCSRFToken: async () => {
        return await axiosClient.get("/sanctum/csrf-cookie") 
    },
    getAdmin:  () => {
        return axiosClient.get('/api/clients')
    },
    getAdminById:  (id) => {
        return axiosClient.get(`/api/clients/${id}`)
    },
    deleteAdmin:  (id) => {
        return axiosClient.delete(`/api/clients/${id}`)
    },
    updateAdmin: async (id, payload) => {
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