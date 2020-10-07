import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {}, // {[id]: 'success' 'error'}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // {[id]: 'success' 'error'}
    quiz: []
};

export default function quizReducer(state = initialState, action) {
    console.log('action', action);
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state,
                loading: true
            };
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                quizes: action.quizes,
                loading: false
            };

        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                quiz: action.quiz,
                loading: false
            };

        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}
