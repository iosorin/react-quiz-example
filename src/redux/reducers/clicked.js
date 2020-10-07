import { UPDATE_CLICKED } from '../actions/actionTypes';

const initialState = {
    clicked: false
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CLICKED:
            return {
                clicked: !state.clicked
            };

        default:
            return state;
    }
}
