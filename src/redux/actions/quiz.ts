import { QuizListItemType, QuizQuestionType, QuizType } from './../../types/quiz';
import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    FINISH_QUIZ,
    QUIZ_SET_STATE,
    QUIZ_NEXT_QUESTION,
    QUIZE_RETRY,
} from './actionTypes';

import axiosQuiz from '../../axios';

export function fetchQuizes() {
    return async (dispatch: any) => {
        dispatch(fetchQuizesStart());

        try {
            const response = await axiosQuiz.get('/quizes.json');

            const quizes: QuizListItemType[] = [];

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: 'Тест № ' + index + 1,
                });
            });

            dispatch(fetchQuizesSuccess(quizes));
        } catch (error) {
            dispatch(fetchQuizesError(error));
        }
    };
}

export function fetchQuizById(quizId: number) {
    return async (dispatch: any) => {
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
        type: FETCH_QUIZES_START,
    };
}

export function fetchQuizSuccess(quiz: QuizType) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz,
    };
}

export function fetchQuizesSuccess(quizes: QuizListItemType[]) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes,
    };
}

export function fetchQuizesError(error: any) {
    return {
        type: FETCH_QUIZES_ERROR,
        error,
    };
}

export function quizSetState(answerState: any, results: any) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results,
    };
}

function finishQuiz() {
    return {
        type: FINISH_QUIZ,
    };
}

function quizNextQuestion(questionNumber: number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number: questionNumber,
    };
}

export function quizAnswerClick(answerId: number) {
    return (dispatch: any, getState: any) => {
        const state = getState().quiz;

        const isQuizFinished = () => {
            return state.activeQuestion + 1 === state.quiz.length;
        };

        /* double success click fix */
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];

            if (state.answerState[key] === 'success') {
                return;
            }
        }

        const question: QuizQuestionType = state.quiz[state.activeQuestion];
        const results = state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            dispatch(quizSetState({ [answerId]: 'success' }, results));

            const tm = window.setTimeout(() => {
                if (isQuizFinished()) {
                    dispatch(finishQuiz());
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1));
                }
                window.clearTimeout(tm);
            }, 1000);
        } else {
            results[question.id] = 'error';

            dispatch(quizSetState({ [answerId]: 'error' }, results));
        }
    };
}

export function retryQuiz(): { type: typeof QUIZE_RETRY } {
    return {
        type: QUIZE_RETRY,
    };
}
