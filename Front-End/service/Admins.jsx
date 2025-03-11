import { axiosClient } from "../api/axios"


const AdminApi = {
    getCSRFToken: async () => {
        return await axiosClient.get("/sanctum/csrf-cookie") 
    },
    getAdmin:  () => {
        return axiosClient.get('/api/admins')
    },
    getAdminById:  (id) => {
        return axiosClient.get(`/api/admins/${id}`)
    },
    deleteAdmin:  (id) => {
        return axiosClient.delete(`/api/admins/${id}`)
    },
    updateAdmin: async (id, payload) => {
        return axiosClient.put(`/api/admins/${id}`, payload)
    },
    addAdmin: async (payload) => {
        return axiosClient.post('/api/admins', payload)
    }
}

export default AdminApi