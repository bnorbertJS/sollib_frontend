import axios from 'axios';

export function userSignupRequest(user){
    return dispatch => {
        return axios.post("/api/v1/register",user);
    }
}