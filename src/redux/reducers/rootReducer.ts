import { combineReducers } from 'redux';

import quizReducer from './quiz';
import createReducer from './create';
import authReducer from './auth';

const rootReducer = combineReducers({
    quiz: quizReducer,
    create: createReducer,
    auth: authReducer,
});

export default rootReducer;
