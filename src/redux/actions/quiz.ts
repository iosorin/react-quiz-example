import axiosInstance from '@/axios';

import { QUIZES, QUIZ } from '@/redux/contants';
import { QuizListItemType, QuizQuestionType, QuizType, IDWithStatusType } from '@/types/quiz';

type FetchQuizesActionType = any;
export function fetchQuizes(): FetchQuizesActionType {
    return async (dispatch: any) => {
        dispatch(fetchQuizesStart());

        try {
            const response = await axiosInstance.get('/quizes.json');

            const list: QuizListItemType[] = [];

            Object.keys(response.data).forEach((key, index) => {
                list.push({
                    id: key,
                    name: 'Тест № ' + index + 1,
                });
            });

            dispatch(fetchQuizesSuccess(list));
        } catch (error) {
            dispatch(fetchQuizesError(error));
        }
    };
}

type FetchQuizByIdActionType = any;
export function fetchQuizById(quizId: number): FetchQuizByIdActionType {
    return async (dispatch: any) => {
        dispatch(fetchQuizesStart());

        try {
            const response = await axiosInstance.get('/quizes/' + quizId + '.json');

            dispatch(fetchQuizSuccess(response.data));
        } catch (error) {
            fetchQuizesError(error);
            console.log(error);
        }
    };
}

type FetchQuizesStartActionType = { type: typeof QUIZES.fetch.start };
export function fetchQuizesStart(): FetchQuizesStartActionType {
    return {
        type: QUIZES.fetch.start,
    };
}

type FetchQuizSuccessActionType = { type: typeof QUIZ.fetch.success; quiz: QuizType };
export function fetchQuizSuccess(quiz: QuizType): FetchQuizSuccessActionType {
    return {
        type: QUIZ.fetch.success,
        quiz,
    };
}

type FetchQuizesSuccessActionType = { type: typeof QUIZES.fetch.success; quizes: QuizListItemType[] };
export function fetchQuizesSuccess(quizes: QuizListItemType[]): FetchQuizesSuccessActionType {
    return {
        type: QUIZES.fetch.success,
        quizes,
    };
}

type FetchQuizesErrorActionType = { type: typeof QUIZES.fetch.error; error: any };
export function fetchQuizesError(error: any): FetchQuizesErrorActionType {
    return {
        type: QUIZES.fetch.error,
        error,
    };
}

type QuizSetStateActionType = {
    type: typeof QUIZ.state.set;
    answerState: IDWithStatusType;
    results: IDWithStatusType;
};
export function quizSetState(answerState: IDWithStatusType, results: IDWithStatusType): QuizSetStateActionType {
    return {
        type: QUIZ.state.set,
        answerState,
        results,
    };
}

type FinishQuizActionType = { type: typeof QUIZ.finish };
function finishQuiz(): FinishQuizActionType {
    return {
        type: QUIZ.finish,
    };
}

type QuizNextQuestionActionType = { type: typeof QUIZ.question.next; number: number };
function quizNextQuestion(questionNumber: number): QuizNextQuestionActionType {
    return {
        type: QUIZ.question.next,
        number: questionNumber,
    };
}

type QuizAnswerClickActionType = any;
export function quizAnswerClick(answerId: number): QuizAnswerClickActionType {
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

type RetryActionType = { type: typeof QUIZ.retry };
export function retryQuiz(): RetryActionType {
    return {
        type: QUIZ.retry,
    };
}

export type QuizActionTypes =
    | FetchQuizesActionType
    | FetchQuizByIdActionType
    | RetryActionType
    | QuizNextQuestionActionType
    | QuizAnswerClickActionType;
