import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(
    (state = {}) => state,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));