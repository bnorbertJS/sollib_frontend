import axios from 'axios';

export function userSignupRequest(user){
    debugger;
    return dispatch => {
        return axios.post("/api/v1/register",user);
    }
}