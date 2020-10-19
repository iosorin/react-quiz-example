import axios from 'axios';

import { AUTH } from '@/store/contants';
import { AuthInitialStateType } from '@/types/auth';

import { RootState } from '@/types/root';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

type ThunkType = ThunkAction<Promise<void> | void, RootState, unknown, AuthActionsTypes>;

/* ThunkAction Usage Example */
export const auth = (email: string, password: string, isLogin: boolean): ThunkType => async (dispatch) => {
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

/* fix dispatch chain (saga - ?) -> replace 1st 'any' with another async call and last with type of it */
export const autoLogin = (): ThunkType => {
    return (dispatch) => {
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
};

export const autoLogout = (time: number) => {
    /* DispatchType Usage Example - plain */
    return (dispatch: Dispatch<AuthActionsTypes>) => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    };
};

type AuthSuccessType = { type: typeof AUTH.success; payload: AuthInitialStateType };
export const authSuccess = (payload: AuthInitialStateType): AuthSuccessType => {
    return {
        type: AUTH.success,
        payload,
    };
};

type AuthLogoutActionType = { type: typeof AUTH.logout };
export const logout = (): AuthLogoutActionType => {
    localStorage.removeItem('auth');

    return {
        type: AUTH.logout,
    };
};

export type AuthActionsTypes = AuthSuccessType | AuthLogoutActionType;
