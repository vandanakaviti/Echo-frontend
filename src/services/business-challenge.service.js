import axios from 'axios';
import authHeader from './auth-header';

const CHALLENGES_API_BASE_URL = "http://localhost:8080/businessChallenges";

class BusinessChallengesService {

    getBusinessChallenges(){
        return axios.get(CHALLENGES_API_BASE_URL, { headers: authHeader() });
    }

    getChallengeById(challengeId){
        return axios.get(CHALLENGES_API_BASE_URL + '/' + challengeId, { headers: authHeader() });
    }
}

export default new BusinessChallengesService();