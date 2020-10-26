import API from '@/api';

import { InferActionsType, BaseThunkType } from '@/utils/typing';

import { Dispatch } from 'redux';
import { AUTH } from '@/store/contants';

export const auth = (email: string, password: string, isLogin: boolean): BaseThunkType<AuthActionsTypes> => async (
    dispatch
) => {
    dispatch(actions.setAuthPending(true));

    try {
        const data = await API.account.auth(email, password, isLogin);

        const token = data.idToken;
        const expiresIn = parseInt(data.expiresIn);
        const expirationDate = new Date(Date.now() + expiresIn * 1000);

        localStorage.setItem('auth', JSON.stringify({ token, expirationDate }));

        dispatch(actions.authSuccess(token));
        dispatch(autoLogout(expiresIn));
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actions.setAuthPending(false));
    }
};

/* fix dispatch chain (saga - ?) -> replace 1st 'any' with another async call and last with type of it */
export const autoLogin = (): BaseThunkType<AuthActionsTypes> => async (dispatch) => {
    dispatch(actions.setAuthPending(true));

    const data = localStorage.getItem('auth');
    const payload = data ? JSON.parse(data) : {};
    const { token, expirationDate } = payload;

    if (token) {
        if (new Date(expirationDate) <= new Date()) {
            dispatch(actions.logout());
        } else {
            dispatch(actions.authSuccess(token));
            dispatch(autoLogout((new Date(expirationDate).getTime() - Date.now()) / 1000));
        }
    } else {
        dispatch(actions.logout());
    }

    dispatch(actions.setAuthPending(false));
};

/* DispatchType Usage Example - plain */
export const autoLogout = (time: number) => {
    return async (dispatch: Dispatch<AuthActionsTypes>) => {
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve(dispatch(actions.logout()));
            }, time * 1000);
        });
    };
};

export const actions = {
    logout: () => {
        /* todo: move side-effect */
        localStorage.removeItem('auth');

        return { type: 'AUTH.logout' } as const;
    },
    authSuccess: (token: string) => ({ type: AUTH.success, token }),
    setAuthPending: (pending: boolean) => ({ type: 'AUTH.pending', pending } as const),
};

export type AuthActionsTypes = InferActionsType<typeof actions>;
