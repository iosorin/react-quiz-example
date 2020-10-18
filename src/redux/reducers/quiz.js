import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    FINISH_QUIZ,
    QUIZE_RETRY,
    QUIZ_NEXT_QUESTION,
    QUIZ_SET_STATE,
} from '../actions/actionTypes';

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state,
                loading: true,
            };
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                quizes: action.quizes,
                loading: false,
            };

        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                quiz: action.quiz,
                loading: false,
            };

        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results,
            };

        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                answerState: null,
                activeQuestion: action.number,
            };

        case FINISH_QUIZ:
            return {
                ...state,
                isFinished: true,
            };

        case QUIZE_RETRY:
            return {
                ...state,
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {},
            };

        default:
            return state;
    }
}
