import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';

/* redux */
import rootReducer from './redux/rootReducer';
import { Provider } from 'react-redux';

// function loggerMiddleware(store) {
//     return function (next) {
//         return function (action) {
//             const result = next(action);

//             console.log('Middleware action type, store state', result.type, store.getState());

//             return result;
//         };
//     };
// }

/* ESNext SHORTHAND */
const loggerMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    console.log('Middleware action type, store state', result.type, store.getState());

    return result;
};

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

const application = (
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

ReactDOM.render(application, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
