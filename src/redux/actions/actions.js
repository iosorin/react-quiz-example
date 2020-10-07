import { UPDATE_CLICKED, INCREMENT_COUNTER, DECREMENT_COUNTER } from './actionTypes';

export function updateClicked() {
    return {
        type: UPDATE_CLICKED
    };
}

export function incrementCounter(value) {
    return {
        type: INCREMENT_COUNTER,
        value
    };
}

export function asyncIncrementCounter(value) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(incrementCounter(value));
        }, 3000);
    };
}

export function decrementCounter(value) {
    return {
        type: DECREMENT_COUNTER,
        value
    };
}
