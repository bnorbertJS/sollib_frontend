import axios from 'axios';

export function setUserDetails(user){
    return {
        type: 'SET_USER_DETAILS',
        user
    }
}

export function userDetailRequest(){
    return dispatch => {
        return axios({
            url: '/api/v1/profile/' + localStorage.getItem("sollib-username"),
            headers: {
                'x-sollib-token': localStorage.getItem("x-sollib-token")
            }
        })
        .then(user => {
            dispatch(setUserDetails(user.data.user));
        })
        .catch(err => { debugger; })
    }
}

export function addSolutionRequest(){
    return dispatch => {
        return axios({
            method: 'post',
            url: '/api/v1/new_solution',
            headers: {
                'x-sollib-token': localStorage.getItem("x-sollib-token")
            }
        })
        .then(sol => {
            debugger;
        })
        .catch(err => console.log(err));
    }
} 