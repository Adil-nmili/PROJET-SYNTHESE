import { axiosClient } from "../api/axios"


const SubCategories = {
  
    getCSRFToken: async () => {
        return await axiosClient.get("/sanctum/csrf-cookie")
    },
    create : async (payload) => {
        return axiosClient.post('/api/sub-categorie', payload)
    },
    update : async (id, payload) => {
        return axiosClient.put(`/api/sub-categorie/${id}`, payload)
    },
    delete : async (id) => {
        return axiosClient.delete(`/api/sub-categorie/${id}`)
    },
    getAll : async () => {
        return axiosClient.get('/api/sub-categorie')
    },
    getById : async (id) => {
        return axiosClient.get(`/api/sub-categorie/${id}`)
    },

}

export default SubCategories
