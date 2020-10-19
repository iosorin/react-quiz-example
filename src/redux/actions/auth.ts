import axios from 'axios';

import { AUTH } from '@/redux/contants';
import { AuthInitialStateType } from '@/types/auth';

type AuthActionType = any;
export function auth(email: string, password: string, isLogin: boolean): AuthActionType {
    return async (dispatch: any) => {
        const settings = {
            email,
            password,
            returnSecureToken: true,
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
        }

        url += '?key=AIzaSyDvCB39YSBlxgKvakS19CkGTPgv_Qb3_pw';

        try {
            const response = await axios.post(url, settings);
            const data = response.data;

            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000 || Date.now());

            const payload = {
                token: data.idToken,
                userId: data.localId,
                expirationDate,
                email,
            };

            localStorage.setItem('auth', JSON.stringify(payload));

            dispatch(authSuccess(payload));
            dispatch(autoLogout(data.expiresIn));
        } catch (error) {
            console.log(error);
        }
    };
}

type AuthSuccessType = {
    type: typeof AUTH.success;
    payload: AuthInitialStateType;
};
export function authSuccess(payload: AuthInitialStateType): AuthSuccessType {
    return {
        type: AUTH.success,
        payload,
    };
}

export function autoLogin(): any {
    /* todo: fix any */
    return (dispatch: any) => {
        const data = localStorage.getItem('auth');
        const payload = data ? JSON.parse(data) : {};

        if (payload.token) {
            if (payload.expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(payload));
                dispatch(autoLogout((new Date(payload.expirationDate).getTime() - new Date().getTime()) / 1000));
            }
        } else {
            dispatch(logout());
        }
    };
}

export function autoLogout(time: number): any {
    /* todo: fix any */
    return (dispatch: any) => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    };
}

type LogoutActionType = { type: typeof AUTH.logout };
export function logout(): LogoutActionType {
    localStorage.removeItem('auth');

    return {
        type: AUTH.logout,
    };
}

export type AuthActionTypes = LogoutActionType | AuthActionType;
