import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from '@/serviceWorker';

import App from '@/containers/App/App';
import rootReducer from '@/redux/reducers/rootReducer';
import '@/styles';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const application = (
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(application, document.getElementById('root'));

serviceWorker.unregister();
