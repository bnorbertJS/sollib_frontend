import axios from 'axios';

export function userSignupRequest(user){
    return dispatch => {
        return axios.post("/api/v1/register",user);
    }
}

export function recruiterSignupRequest(user){
    return dispatch => {
        return axios.post("/api/v1/register_recruiter",user);
    }
}