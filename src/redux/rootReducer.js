const initialState = {
    counter: 1,
    clicked: false
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_CLICKED':
            return {
                clicked: !state.clicked
            };

        case 'INCREMENT_COUNTER':
            return {
                counter: state.counter + action.value
            };

        case 'DECREMENT_COUNTER':
            return {
                counter: state.counter - action.value
            };

        default:
            break;
    }
    return state;
}
