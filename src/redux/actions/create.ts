import { QuizQuestionType } from 'types/quiz';
import axiosQuiz from '../../axios';
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from './actionTypes';

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

export function resetQuizCreation(): { type: typeof RESET_QUIZ_CREATION } {
    return {
        type: RESET_QUIZ_CREATION,
    };
}

export function finishCreateQuiz() {
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
