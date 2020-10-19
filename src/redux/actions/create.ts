import axiosInstance from '@/axios';

import { QUIZ } from '@/redux/contants';
import { QuizQuestionType } from '@/types';

type CreateQuizQuestionActionType = {
    type: typeof QUIZ.question.create;
    item: QuizQuestionType;
};
export function createQuizQuestion(item: QuizQuestionType): CreateQuizQuestionActionType {
    return {
        type: QUIZ.question.create,
        item,
    };
}

type ResetQuizCreationActionType = { type: typeof QUIZ.creation.reset };
export function resetQuizCreation(): ResetQuizCreationActionType {
    return {
        type: QUIZ.creation.reset,
    };
}

type FinishCreateQuizActionType = any;
export function finishCreateQuiz(): FinishCreateQuizActionType {
    /* todo: fix any */
    return async (dispatch: any, getState: any) => {
        const { quiz } = getState().create;

        try {
            await axiosInstance.post('/quizes.json', quiz);

            dispatch(resetQuizCreation());
        } catch (error) {
            console.log(error);
        }
    };
}

export type CreateActionTypes = FinishCreateQuizActionType | ResetQuizCreationActionType | CreateQuizQuestionActionType;
