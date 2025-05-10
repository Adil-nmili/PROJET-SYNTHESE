import { axiosClient } from "../api/axios"


const UserApi = {
    getCSRFToken: async () => {
        return await axiosClient.get("/sanctum/csrf-cookie") 
    },   
    verifie_user: async (payload) => {
        return axiosClient.post('/api/users', payload)
    }
}

export default UserApi