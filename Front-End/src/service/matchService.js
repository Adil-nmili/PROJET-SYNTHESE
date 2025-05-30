import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

class MatchService {
    static async getAllMatches() {
        try {
            const response = await axios.get(`${API_URL}/api/matches`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async createMatch(matchData) {
        try {
            const response = await axios.post(`${API_URL}/api/matches`, matchData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async deleteMatch(matchId) {
        try {
            const response = await axios.delete(`${API_URL}/api/matches/${matchId}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async updateMatch(matchId, matchData) {
        try {
            const response = await axios.put(`${API_URL}/api/matches/${matchId}`, matchData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export { MatchService }; 