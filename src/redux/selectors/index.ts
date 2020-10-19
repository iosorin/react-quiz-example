import { RootState } from '@/types';

export const getQuiz = (state: RootState) => state.quiz;
export const getCreate = (state: RootState) => state.create;
export const getAuth = (state: RootState) => state.auth;

export const getLogged = (state: RootState) => !!state.auth.token;
