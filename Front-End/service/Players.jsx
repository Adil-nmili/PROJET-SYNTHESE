import {axiosClient} from '../api/axios'


const Players = {
    getCSRFToken : async () => {
        return await axiosClient.get("/sanctum/csrf-cookie")
    },
    getPlayers : async () => {
        return axiosClient.get('/api/players')
    },
    getPlayer : async (id) => {
        return axiosClient.get(`/api/players/${id}`)
    },
    createPlayer : async (player) => {
        return axiosClient.post('/api/players', player, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST'
        })
    },
    updatePlayer : async (id, player) => {
        return axiosClient.put(`/api/players/${id}`, player, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'PUT'
        })
    },
    deletePlayer : async (id) => {
        return axiosClient.delete(`/api/players/${id}`)
    }
        
}

export default Players