import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from '../actions/actionTypes';

export type CreateInitialStateType = {
    quiz: Array<Record<string, any>>;
};

const initialState: CreateInitialStateType = {
    quiz: [],
};

export default function createReducer(state = initialState, action: any) {
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.item],
            };

        case RESET_QUIZ_CREATION:
            return {
                ...state,
                quiz: [],
            };

        default:
            return state;
    }
}
