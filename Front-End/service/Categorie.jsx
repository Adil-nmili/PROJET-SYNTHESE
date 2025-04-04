import { axiosClient } from "../api/axios"


const Categorie = {
  
    getCSRFToken: async () => {
        return await axiosClient.get("/sanctum/csrf-cookie")
    },
    create : async (payload) => {
        return axiosClient.post('/api/categories', payload)
    },
    update : async (id, payload) => {
        return axiosClient.put(`/api/categories/${id}`, payload)
    },
    delete : async (id) => {
        return axiosClient.delete(`/api/categories/${id}`)
    },
    getAll : async () => {
        return axiosClient.get('/api/categories')
    },
    getById : async (id) => {
        return axiosClient.get(`/api/categories/${id}`)
    },

}

export default Categorie
