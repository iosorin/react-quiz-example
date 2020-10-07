import { DECREMENT_COUNTER, INCREMENT_COUNTER } from '../actions/actionTypes';

const initialState = {
    counter: 0
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                counter: state.counter + action.value
            };

        case DECREMENT_COUNTER:
            return {
                counter: state.counter - action.value
            };

        default:
            return state;
    }
}
