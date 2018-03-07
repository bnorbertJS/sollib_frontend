import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setLoggedInUser } from './actions/LoginActions';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension && window.devToolsExtension()
    )
);

const token = localStorage.getItem("x-sollib-token");

if(token){
    store.dispatch(setLoggedInUser(jwt_decode(token)));
}
//setAuthToken(localStorage.getItem("x-sollib-token"));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"));