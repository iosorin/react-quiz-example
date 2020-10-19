import { RootState } from '@/types/root';
import { ThunkAction } from 'redux-thunk';
import axiosInstance from '@/axios';

import { QUIZES, QUIZ } from '@/store/contants';
import { QuizListItemType, QuizQuestionType, QuizType, IDWithStatusType } from '@/types';

/* ThunkType Usage Example */
type ThunkType = ThunkAction<Promise<void> | void, RootState, unknown, QuizActionsTypes>;

export const fetchQuizes = (): ThunkType => {
    // eslint-disable-next-line
    return async (dispatch, _getState, _extraArgument) => {
        // _extraArgument usage example - passing an api instance

        dispatch(fetchQuizesStart());

        try {
            const response = await axiosInstance.get('/quizes.json');

            const list: QuizListItemType[] = [];

            Object.keys(response.data).forEach((key, index) => {
                list.push({
                    id: key,
                    name: '№ ' + index + 1,
                });
            });

            dispatch(fetchQuizesSuccess(list));
        } catch (error) {
            dispatch(fetchQuizesError(error));
        }
    };
};

export const fetchQuizById = (quizUid: string): ThunkType => {
    return async (dispatch) => {
        dispatch(fetchQuizesStart());

        try {
            const response = await axiosInstance.get('/quizes/' + quizUid + '.json');

            dispatch(fetchQuizSuccess(response.data));
        } catch (error) {
            fetchQuizesError(error);

            console.log(error);
        }
    };
};

export const quizAnswerClick = (answerId: number): ThunkType => {
    return (dispatch, getState) => {
        const state = getState().quiz;

        const isQuizFinished = () => {
            return state.activeQuestion + 1 === state.quiz.length;
        };

        /* double success click fix */
        if (state.answerState) {
            const key = parseInt(Object.keys(state.answerState)[0]);

            if (key && state.answerState[key] === 'success') {
                return;
            }
        }

        const question: QuizQuestionType = state.quiz[state.activeQuestion];
        const results = state.results;

        console.log(question.rightAnswerId, answerId);
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
};

type FetchQuizesStartActionType = { type: typeof QUIZES.fetch.start };
export const fetchQuizesStart = (): FetchQuizesStartActionType => {
    return {
        type: QUIZES.fetch.start,
    };
};

type FetchQuizSuccessActionType = { type: typeof QUIZ.fetch.success; quiz: QuizType };
export const fetchQuizSuccess = (quiz: QuizType): FetchQuizSuccessActionType => {
    return {
        type: QUIZ.fetch.success,
        quiz,
    };
};

type FetchQuizesSuccessActionType = { type: typeof QUIZES.fetch.success; quizes: QuizListItemType[] };
export const fetchQuizesSuccess = (quizes: QuizListItemType[]): FetchQuizesSuccessActionType => {
    return {
        type: QUIZES.fetch.success,
        quizes,
    };
};

type FetchQuizesErrorActionType = { type: typeof QUIZES.fetch.error; error: unknown };
export const fetchQuizesError = (error: unknown): FetchQuizesErrorActionType => {
    return {
        type: QUIZES.fetch.error,
        error,
    };
};

type QuizSetStateActionType = {
    type: typeof QUIZ.state.set;
    answerState: IDWithStatusType;
    results: IDWithStatusType;
};
export const quizSetState = (answerState: IDWithStatusType, results: IDWithStatusType): QuizSetStateActionType => {
    return {
        type: QUIZ.state.set,
        answerState,
        results,
    };
};

type QuizFinishActionType = { type: typeof QUIZ.finish };
const finishQuiz = (): QuizFinishActionType => {
    return {
        type: QUIZ.finish,
    };
};

type QuizNextQuestionActionType = { type: typeof QUIZ.question.next; number: number };
const quizNextQuestion = (questionNumber: number): QuizNextQuestionActionType => {
    return {
        type: QUIZ.question.next,
        number: questionNumber,
    };
};

type QuizRetryActionType = { type: typeof QUIZ.retry };
export const retryQuiz = (): QuizRetryActionType => {
    return {
        type: QUIZ.retry,
    };
};

export type QuizActionsTypes =
    | FetchQuizesStartActionType
    | FetchQuizSuccessActionType
    | FetchQuizesSuccessActionType
    | FetchQuizesErrorActionType
    | QuizSetStateActionType
    | QuizFinishActionType
    | QuizNextQuestionActionType
    | QuizRetryActionType;
