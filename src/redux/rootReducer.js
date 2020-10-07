import { combineReducers } from 'redux';

import clicked from './reducers/clicked';
import counter from './reducers/counter';

export default combineReducers({
    clicked,
    counter
});
