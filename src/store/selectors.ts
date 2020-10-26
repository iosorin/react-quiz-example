import { RootState } from '@/types';

export const getAuthState = (state: RootState) => state.auth;
export const getQuizState = (state: RootState) => state.quiz;

export const getQuiz = (state: RootState) => state.quiz.quiz;
export const getQuizAnswers = (state: RootState) => state.quiz.quiz.questions[state.quiz.activeQuestion].answers; // combine?
export const getQuizResults = (state: RootState) => state.quiz.results;
export const getCurrentQuestionNumber = (state: RootState) => state.quiz.activeQuestion;
export const getAnswerState = (state: RootState) => state.quiz.answerState;
export const getQuizIsFetching = (state: RootState) => state.quiz.loading;
export const getQuizIsFinished = (state: RootState) => state.quiz.isFinished;

export const getCurrentUser = (state: RootState) => state.user.user;
export const getAuthenticated = (state: RootState) => !!state.auth.token;

export const getNotification = (state: RootState) => state.notifications;
