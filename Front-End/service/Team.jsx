import axiosClient from "./axiosClient";

const Team = {
    getTeams : async () => {
        return axiosClient.get('/api/teams')
    },
    getTeam : async (id) => {
        return axiosClient.get(`/api/teams/${id}`)
    },
    createTeam : async (team) => {
        return axiosClient.post('/api/teams', team)
    },
    updateTeam : async (id, team) => {
        return axiosClient.put(`/api/teams/${id}`, team)
    },
    deleteTeam : async (id) => {
        return axiosClient.delete(`/api/teams/${id}`)
    }   
}

export default Team;
