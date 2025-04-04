import {axiosClient} from '../api/axios'


const Players = {
    getCSRFToken : async () => {
        return await axiosClient.get("/sanctum/csrf-cookie")
    },
    getPlayers : async () => {
        return axiosClient.get('/api/players')
    }
}

export default Players