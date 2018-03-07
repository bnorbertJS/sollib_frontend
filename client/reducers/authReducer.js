import isEmpty from 'lodash/isEmpty';

const INITIAL_STATE = {
    isAuthenticated: false,
    user: {}
};

/**
* @param {Object} state - Default application state
* @param {Object} action - Action from action creator
* @returns {Object} New state
*/
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_LOGGEDIN_USER':
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
        default: return state;
    }
};