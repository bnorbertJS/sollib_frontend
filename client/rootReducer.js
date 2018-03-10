import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import userDetailsReducer from './reducers/userDetailsreducer';

export default combineReducers({
    authReducer,
    userDetailsReducer
});