import { QUIZ } from '@/redux/contants';
import { QuizType, QuizQuestionType } from 'types/quiz';

const itialState: QuizType = {
    quiz: [],
};

type ActionType = { type: string; item: QuizQuestionType };

export default function createReducer(state = itialState, action: ActionType): QuizType {
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
