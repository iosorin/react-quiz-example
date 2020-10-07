import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS
} from './actionTypes';
import axiosQuiz from '../../axios';

export function fetchQuizes(payload) {
    return async (dispatch) => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axiosQuiz.get('/quizes.json');

            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: 'Тест № ' + index + 1
                });
            });

            dispatch(fetchQuizesSuccess(quizes));
        } catch (error) {
            dispatch(fetchQuizesError(error));
        }
    };
}

export function fetchQuizById(quizId) {
    return async (dispatch) => {
        dispatch(fetchQuizesStart());

        try {
            const response = await axiosQuiz.get('/quizes/' + quizId + '.json');
            const quiz = response;

            dispatch(fetchQuizSuccess(quiz.data));

            // this.setState({ quiz, loading: false });
        } catch (error) {
            fetchQuizesError(error);
            console.log(error);
        }
    };
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    };
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    };
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    };
}

export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    };
}
