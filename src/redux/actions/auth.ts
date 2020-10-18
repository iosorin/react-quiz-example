import axios from 'axios';
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionTypes';
import { AuthInitialStateType } from 'types/auth';

export function auth(email: string, password: string, isLogin: boolean) {
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
    type: typeof AUTH_SUCCESS;
    payload: AuthInitialStateType;
};

export function authSuccess(payload: AuthInitialStateType): AuthSuccessType {
    return {
        type: AUTH_SUCCESS,
        payload,
    };
}

export function autoLogin() {
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

export function autoLogout(time: number) {
    /* todo: fix any */
    return (dispatch: any) => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    };
}

export function logout(): { type: typeof AUTH_LOGOUT } {
    localStorage.removeItem('auth');

    return {
        type: AUTH_LOGOUT,
    };
}
