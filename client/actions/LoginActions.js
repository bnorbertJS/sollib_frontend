import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

export function setLoggedInUser(user){
    return {
        type: 'SET_LOGGEDIN_USER',
        user
    }
}

export function userLoginRequest(userData){
    return dispatch => {
        return axios({
                    method: 'post',
                    url: 'http://localhost:8000/api/v1/login',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: new URLSearchParams(userData)
                })
                .then(token => {
                    localStorage.setItem("x-sollib-token",token.data);
                    //setAuthToken(token.data);
                    dispatch(setLoggedInUser(jwt_decode(token.data)))
                })
                .catch(err => { throw new Error("Error logging in"); })
    }
};

