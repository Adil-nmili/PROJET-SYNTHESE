import { axiosClient } from "../api/axios"


const LoginApi = {
    getCSRFToken : async () => {
        return await axiosClient.get("/sanctum/csrf-cookie")
    },

    login : async (payload) => {
        return axiosClient.post('/api/login',payload)
    }
}


export default LoginApi