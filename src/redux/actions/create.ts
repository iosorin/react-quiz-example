import { QuizQuestionType } from 'types/quiz';
import axiosQuiz from 'axios';
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from 'redux/contants';

type CreateQuizQuestionActionType = {
    type: typeof CREATE_QUIZ_QUESTION;
    item: QuizQuestionType;
};
export function createQuizQuestion(item: QuizQuestionType): CreateQuizQuestionActionType {
    return {
        type: CREATE_QUIZ_QUESTION,
        item,
    };
}

type ResetQuizCreationActionType = { type: typeof RESET_QUIZ_CREATION };
export function resetQuizCreation(): ResetQuizCreationActionType {
    return {
        type: RESET_QUIZ_CREATION,
    };
}

// type FinishCreateQuizActionType = { type: typeof RESET_QUIZ_CREATION };
export function finishCreateQuiz(): any {
    /* todo: fix any */
    return async (dispatch: any, getState: any) => {
        const { quiz } = getState().create;

        try {
            await axiosQuiz.post('/quizes.json', quiz);

            dispatch(resetQuizCreation());
        } catch (error) {
            console.log(error);
        }
    };
}
