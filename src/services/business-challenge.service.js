import axios from 'axios';
import authHeader from './auth-header';

const CHALLENGES_API_BASE_URL = "http://localhost:8080/businessChallenges";

class BusinessChallengesService {

    getBusinessChallenges(){
        return axios.get(CHALLENGES_API_BASE_URL, { headers: authHeader() });
    }

    getRecentFiveBusinessChallenges(){
        return axios.get(CHALLENGES_API_BASE_URL + "/recent", { headers: authHeader() });
    }

    getBusinesssChallengeById(challengeId){
        return axios.get(CHALLENGES_API_BASE_URL + '/' + challengeId, { headers: authHeader() });
    }

    addBusinessChallenge(challenge){
        return axios.post(CHALLENGES_API_BASE_URL, challenge, { headers: authHeader() });
    }

    updateChallenge(id, challenge){
        return axios.put(CHALLENGES_API_BASE_URL + "/" + id, challenge, { headers: authHeader() })
    }

    findByTitleDescription(searchItem) {
        return axios.get(CHALLENGES_API_BASE_URL + "/search", { params: { searchItem: searchItem}, headers: authHeader() });
    }

    getBusinessAreasList(){
        return axios.get(CHALLENGES_API_BASE_URL + "/businessAreas", {headers: authHeader() })
    }
}

export default new BusinessChallengesService();