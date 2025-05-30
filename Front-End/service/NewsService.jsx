import { axiosClient } from "../api/axios";

export const NewsService = {
    getCSRFToken: async () => {
        return await axiosClient.get("/sanctum/csrf-cookie") 
    },

    createArticle : async (formData) => {
        return axiosClient.post('/api/news-articles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        });
    },
    getAllArticles :  async () => {
        return axiosClient.get('/api/news-articles')
    },
    updateArticle : async (id, payload) => {
        return axiosClient.put(`/api/news/${id}`,payload)
    },
    getArticleById : async (id) => {
        return axiosClient.get(`/api/news/${id}`)
    },
    deleteArticle : async (id) => {
        return axiosClient.delete(`/api/news/${id}`)
    },
    createMatch : async (data) => {
        try {
            const response = await axiosClient.post('/api/match-create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            console.error('Error creating match:', error);
            throw error;
        }
    },
    getMatchs : async () => {
        return axiosClient.get('/api/match')
    },
    getMatch : async (id) => {
        return axiosClient.get(`/api/match/${id}`)
    },
    createPlayerStats: async (data) => {
        try {
            const response = await axiosClient.post('/api/player-stats', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            console.error('Error creating player stats:', error);
            throw error;
        }
    },
    getPlayerStats: async () => {
        return axiosClient.get('/api/player-stats');
    },
    getPlayerStatsById: async (id) => {
        return axiosClient.get(`/api/player-stats/${id}`);
    },
    // Match Calendar Methods
    createMatchCalendar: async (data) => {
        try {
            const response = await axiosClient.post('/api/match-calendar', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    getMatchCalendars: async () => {
        try {
            const response = await axiosClient.get('/api/match-calendar');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getMatchCalendarById: async (id) => {
        try {
            const response = await axiosClient.get(`/api/match-calendar/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateMatchCalendar: async (id, data) => {
        try {
            const response = await axiosClient.put(`/api/match-calendar/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    deleteMatchCalendar: async (id) => {
        try {
            const response = await axiosClient.delete(`/api/match-calendar/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    // Team Info Methods
    createTeamInfo: async (formData) => {
        return await axiosClient.post('/api/team-info', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getTeamInfo: async () => {
        return await axiosClient.get('/api/team-info');
    },
    getTeamInfoById: async (id) => {
        return await axiosClient.get(`/api/team-info/${id}`);
    },
    updateTeamInfo: async (id, formData) => {
        return await axiosClient.post(`/api/team-info/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    deleteTeamInfo: async (id) => {
        return await axiosClient.delete(`/api/team-info/${id}`);
    },
    // Email Verification Methods
    sendVerificationCode: async (data) => {
        return await axiosClient.post('/api/send-verification-code', data);
    },
    verifyCode: async (data) => {
        return await axiosClient.post('/api/verify-code', data);
    },
    checkVerificationStatus: async (email) => {
        return await axiosClient.post('/api/check-verification-status', { email });
    },
}