import { RootState } from '@/types';

export const getQuiz = (state: RootState) => state.quiz;
export const getAuth = (state: RootState) => state.auth;
export const getCurrentUser = (state: RootState) => state.auth.user;
/* Computed selector example */
export const getAuthenticated = (state: RootState) => !!state.auth.token;
