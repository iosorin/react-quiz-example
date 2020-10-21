import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from '@/serviceWorker';
import store from '@/store';
import App from '@/containers/App';
import '@/styles';

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const application = (
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
);

ReactDOM.render(application, document.getElementById('root'));

serviceWorker.unregister();
