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
                    url: '/api/v1/login',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: userData
                })
                .then(token => {
                    localStorage.setItem("x-sollib-token",token.data.token);
                    //setAuthToken(token.data.token);
                    let config = jwt_decode(token.data.token);
                    localStorage.setItem("sollib-username",config.username);
                    dispatch(setLoggedInUser(config));
                })
                .catch(err => { throw new Error("Error logging in"); })
    }
};

