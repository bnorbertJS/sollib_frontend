import axios from 'axios';

export function userLoginRequest(userData){
    return dispatch => {
        debugger;
        return axios({
                    method: 'post',
                    url: 'http://localhost:8000/api/v1/login',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: new URLSearchParams(userData)
                })
                .then(token => { localStorage.setItem("x-sollib-token",token.data); })
                .catch(err => { throw new Error("Error logging in"); })
    }
};

