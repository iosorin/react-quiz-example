import API from '@/api';

import { RootState } from '@/types/root';
import { Dispatch } from 'redux';

import { QUIZ } from '@/store/contants';
import { QuizQuestionType } from '@/types';

/* DispatchType Usage Example - DispatchType */
type DispatchType = Dispatch<CreateActionsTypes>;

/* DispatchType Usage Example - call */
export const finishCreateQuiz = () => {
    return async (dispatch: DispatchType, getState: () => RootState) => {
        const { quiz } = getState().create;

        try {
            await API.newQuiz(quiz);

            dispatch(resetQuizCreation());
        } catch (error) {
            console.log(error);
        }
    };
};

/* DispatchType Usage Example - target */
type CreateQuizQuestionActionType = {
    type: typeof QUIZ.question.create;
    item: QuizQuestionType;
};
export const createQuizQuestion = (item: QuizQuestionType): CreateQuizQuestionActionType => {
    return {
        type: QUIZ.question.create,
        item,
    };
};

/* DispatchType Usage Example - target */
type ResetQuizCreationActionType = { type: typeof QUIZ.creation.reset };
export const resetQuizCreation = (): ResetQuizCreationActionType => {
    return {
        type: QUIZ.creation.reset,
    };
};

/* DispatchType Usage Example - available types */
export type CreateActionsTypes = CreateQuizQuestionActionType | ResetQuizCreationActionType;
