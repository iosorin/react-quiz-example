import { QuizType } from '@/types/quiz';
import { QUIZ } from '@/store/contants';
import { CreateActionsTypes } from '@/store/actions/create';

const initialState: { quiz: QuizType } = {
    quiz: {
        name: '',
        questions: [],
    },
};

const createReducer = (state = initialState, action: CreateActionsTypes): typeof initialState => {
    switch (action.type) {
        case QUIZ.question.create:
            const questions = [...state.quiz.questions, action.item];

            return {
                ...state,
                quiz: {
                    ...state.quiz,
                    questions,
                },
            };

        case QUIZ.creation.reset:
            return {
                ...state,
                quiz: {
                    name: '',
                    questions: [],
                },
            };

        default:
            return state;
    }
};

export default createReducer;
