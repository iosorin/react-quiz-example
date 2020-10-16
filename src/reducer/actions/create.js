import axiosQuiz from '../../axios';
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from './actionTypes';

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item,
    };
}

export function resetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION,
    };
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        const { quiz } = getState().create;

        try {
            await axiosQuiz.post('/quizes.json', quiz);

            dispatch(resetQuizCreation());
        } catch (error) {
            console.log(error);
        }
    };
}
