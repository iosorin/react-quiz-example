import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from '@/sagas';

/* middleware */
const sagamd = createSagaMiddleware();
const middleware = [thunk, sagamd];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

sagamd.run(rootSaga);

export default store;
