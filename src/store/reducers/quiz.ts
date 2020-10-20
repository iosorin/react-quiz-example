import { QuizInitialStateType } from '@/types/quiz';
import { QUIZES, QUIZ } from '@/store/contants';
import { QuizActionsTypes } from '@/store/actions/quiz';

const initialState: QuizInitialStateType = {
    quizes: [],
    loading: false,
    error: null,
    results: {},
    answerState: {},
    isFinished: false,
    activeQuestion: 0,
    quiz: [],
};

const quizReducer = (state = initialState, action: QuizActionsTypes): QuizInitialStateType => {
    switch (action.type) {
        case QUIZES.fetch.start:
            return {
                ...state,
                loading: true,
            };

        case QUIZES.fetch.success:
            return {
                ...state,
                quizes: action.quizes,
                loading: false,
            };

        case QUIZ.fetch.success:
            return {
                ...state,
                quiz: action.quiz,
                loading: false,
            };

        case QUIZES.fetch.error:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case QUIZ.state.set:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results,
            };

        case QUIZ.question.next:
            return {
                ...state,
                activeQuestion: action.number,
                answerState: {},
            };

        case QUIZ.finish:
            return {
                ...state,
                isFinished: true,
            };

        case QUIZ.retry:
            return {
                ...state,
                activeQuestion: 0,
                isFinished: false,
                answerState: {},
                results: {},
            };

        default:
            return state;
    }
};

export default quizReducer;
