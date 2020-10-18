import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from 'redux/contants';
import { QuizType, QuizQuestionType } from 'types/quiz';

const itialState: QuizType = {
    quiz: [],
};

type ActionT = { type: string; item: QuizQuestionType };

export default function createReducer(state = itialState, action: ActionT): QuizType {
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
