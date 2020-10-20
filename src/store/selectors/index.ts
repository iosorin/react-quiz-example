import { RootState } from '@/types';

export const getQuiz = (state: RootState) => state.quiz;
export const getCreate = (state: RootState) => state.create;
export const getAuth = (state: RootState) => state.auth;

/* Computed selector example */
export const getAuthenticated = (state: RootState) => !!state.auth.token;
