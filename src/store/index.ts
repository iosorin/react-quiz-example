import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from '@/sagas';

/* middleware */
const saga = createSagaMiddleware();
const middleware = [thunk, saga];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

saga.run(rootSaga);

export default store;
