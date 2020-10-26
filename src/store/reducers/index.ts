import { reducer as reduxFormReducer } from 'redux-form';
import { combineReducers } from 'redux';

import quizReducer from './quiz';
import createReducer from './create';
import authReducer from './auth';
import userReducer from './user';
import notificationsReducers from './notifications';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    quiz: quizReducer,
    create: createReducer,
    notifications: notificationsReducers,
    form: reduxFormReducer,
});

export default rootReducer;
