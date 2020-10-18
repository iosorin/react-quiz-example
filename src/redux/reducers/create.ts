import { QUIZ } from '@/redux/contants';
import { QuizType, QuizQuestionType } from 'types/quiz';

const itialState: QuizType = {
    quiz: [],
};

type ActionT = { type: string; item: QuizQuestionType };

export default function createReducer(state = itialState, action: ActionT): QuizType {
    switch (action.type) {
        case QUIZ.question.create:
            return {
                ...state,
                quiz: [...state.quiz, action.item],
            };

        case QUIZ.creation.reset:
            return {
                ...state,
                quiz: [],
            };

        default:
            return state;
    }
}
