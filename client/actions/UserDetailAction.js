import axios from 'axios';

export function setUserDetails(user){
    return {
        type: 'SET_USER_DETAILS',
        user
    }
}

export function  userDetailRequest(){
    return dispatch => {
        /*return axios({
            method: 'get',
            url: 'http://localhost:8000/api/v1/me',
            headers: {
                'x-sollib-token': localStorage.getItem("x-sollib-token")
            }
        })
        .then(user => {
            dispatch(setUserDetails(user));
        })
        .catch(err => { debugger; })*/

        dispatch(setUserDetails({name: "Norbert"}))
    }
}