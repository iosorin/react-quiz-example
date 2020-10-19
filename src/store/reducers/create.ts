import { QuizType } from '@/types/quiz';
import { QUIZ } from '@/store/contants';
import { CreateActionsTypes } from '@/store/actions/create';

const initialState = {
    quiz: [] as QuizType,
};

const createReducer = (state = initialState, action: CreateActionsTypes): typeof initialState => {
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
};

export default createReducer;
