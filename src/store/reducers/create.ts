import { QuizType } from '@/types/quiz';
import { QUIZ } from '@/store/constants';
import { CreateActionsTypes } from '@/store/actions/create';

export const initialState: { newQuiz: QuizType } = {
    newQuiz: {
        name: '',
        questions: [],
    },
};

const createReducer = (state = initialState, action: CreateActionsTypes): typeof initialState => {
    switch (action.type) {
        case QUIZ.question.create:
            const questions = [...state.newQuiz.questions, action.question];

            return {
                ...state,
                newQuiz: {
                    ...state.newQuiz,
                    questions,
                },
            };

        case QUIZ.creation.reset:
            return {
                ...state,
                newQuiz: {
                    name: '',
                    questions: [],
                },
            };

        default:
            return state;
    }
};

export default createReducer;
