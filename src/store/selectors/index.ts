import { RootState } from '@/types';

export const getQuiz = (state: RootState) => state.quiz;
export const getCreate = (state: RootState) => state.create;
export const getAuth = (state: RootState) => state.auth;

/* Computed selector example */
export const getAuthenticated = (state: RootState) => !!state.auth.token;
export const getEmail = (state: RootState) => state.auth.email;
// export const getFirsName = (state: RootState) => state.auth.name.split(' ')[0] || '';
// export const getLastName = (state: RootState) => state.auth.name.split(' ')[1] || '';
