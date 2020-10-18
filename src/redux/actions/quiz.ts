import { QuizListItemType, QuizQuestionType, QuizType, IDWithStatusType } from 'types/quiz';

import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    FINISH_QUIZ,
    QUIZ_SET_STATE,
    QUIZ_NEXT_QUESTION,
    QUIZE_RETRY,
} from 'redux/contants';

import axiosQuiz from '../../axios';

export function fetchQuizes(): any {
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

export function fetchQuizById(quizId: number): any {
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

type FetchQuizesStartActionType = { type: typeof FETCH_QUIZES_START };
export function fetchQuizesStart(): FetchQuizesStartActionType {
    return {
        type: FETCH_QUIZES_START,
    };
}

type FetchQuizSuccessActionType = { type: typeof FETCH_QUIZ_SUCCESS; quiz: QuizType };
export function fetchQuizSuccess(quiz: QuizType): FetchQuizSuccessActionType {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz,
    };
}

type FetchQuizesSuccessActionType = { type: typeof FETCH_QUIZES_SUCCESS; quizes: QuizListItemType[] };
export function fetchQuizesSuccess(quizes: QuizListItemType[]): FetchQuizesSuccessActionType {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes,
    };
}

type FetchQuizesErrorActionType = { type: typeof FETCH_QUIZES_ERROR; error: any };
export function fetchQuizesError(error: any): FetchQuizesErrorActionType {
    return {
        type: FETCH_QUIZES_ERROR,
        error,
    };
}

type QuizSetStateActionType = {
    type: typeof QUIZ_SET_STATE;
    answerState: IDWithStatusType;
    results: IDWithStatusType;
};
export function quizSetState(answerState: IDWithStatusType, results: IDWithStatusType): QuizSetStateActionType {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results,
    };
}

type FinishQuizActionType = { type: typeof FINISH_QUIZ };
function finishQuiz(): FinishQuizActionType {
    return {
        type: FINISH_QUIZ,
    };
}

type QuizNextQuestionActionType = { type: typeof QUIZ_NEXT_QUESTION; number: number };
function quizNextQuestion(questionNumber: number): QuizNextQuestionActionType {
    return {
        type: QUIZ_NEXT_QUESTION,
        number: questionNumber,
    };
}

export function quizAnswerClick(answerId: number): any {
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
