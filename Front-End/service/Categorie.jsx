import { axiosClient } from "../api/axios"


const Categorie = {
  
    getCSRFToken: async () => {
        return await axiosClient.get("/sanctum/csrf-cookie")
    },
    create : async (payload) => {
        return axiosClient.post('/api/categories', payload, { headers: { "Content-Type": "multipart/form-data" } })
    },
    update : async (id, payload) => {
        return axiosClient.put(`/api/categories/${id}`, payload, { headers: { "Content-Type": "multipart/form-data" } , method: 'PUT'})
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
