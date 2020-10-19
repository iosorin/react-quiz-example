import { combineReducers } from 'redux';

import quizReducer from './quiz';
import createReducer from './create';
import authReducer from './auth';

const rootReducer = combineReducers({
    auth: authReducer,
    quiz: quizReducer,
    create: createReducer,
});

export default rootReducer;
