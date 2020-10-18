import React from 'react';
import ReactDOM from 'react-dom';
import 'styles';
import App from 'containers/App/App';
import * as serviceWorker from 'serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import rootReducer from 'reducer/reducers/rootReducer';
import thunk from 'redux-thunk';

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
