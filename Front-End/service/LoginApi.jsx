// import { axiosClient } from "../api/axios"


// const LoginApi = {
//     getCSRFToken : async () => {
//         return await axiosClient.get("/sanctum/csrf-cookie")
//     },

//     login : async (payload) => {
//         return axiosClient.post('/api/login',payload)
//     }
// }


// export default LoginApi
import axios from 'axios';

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api", // Assurez-vous que Laravel tourne sur ce port
});

export default API;
