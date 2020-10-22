import API from '@/api';

import { InferActionsType, BaseThunkType } from '@/utils/typing';

import { Dispatch } from 'redux';
import { AUTH } from '@/store/contants';
import { fetchUser } from './user';

export const auth = (email: string, password: string, isLogin: boolean): BaseThunkType<AuthActionsTypes> => async (
    dispatch
) => {
    try {
        const data = await API.account.auth(email, password, isLogin);

        const token = data.idToken;
        const expiresIn = parseInt(data.expiresIn);
        const expirationDate = new Date(Date.now() + expiresIn * 1000);

        localStorage.setItem('auth', JSON.stringify({ token, expirationDate }));

        dispatch(actions.authSuccess(token));
        dispatch(waitExpiration(expiresIn));

        fetchUser(token);
    } catch (error) {
        console.log(error);
    }
};

/* fix dispatch chain (saga - ?) -> replace 1st 'any' with another async call and last with type of it */
export const autoLogin = (): BaseThunkType<AuthActionsTypes> => async (dispatch) => {
    const data = localStorage.getItem('auth');
    const payload = data ? JSON.parse(data) : {};
    const { token, expirationDate } = payload;

    if (token) {
        if (new Date(expirationDate) <= new Date()) {
            dispatch(actions.logout());
        } else {
            dispatch(actions.authSuccess(token));
            dispatch(waitExpiration((new Date(expirationDate).getTime() - Date.now()) / 1000));

            fetchUser(token);
        }
    } else {
        dispatch(actions.logout());
    }
};

/* DispatchType Usage Example - plain */
export const waitExpiration = (time: number) => {
    return async (dispatch: Dispatch<AuthActionsTypes>) => {
        setTimeout(() => {
            dispatch(actions.logout());
        }, time * 1000);
    };
};

export const actions = {
    logout: () => {
        /* todo: move side-effect */
        localStorage.removeItem('auth');

        return { type: 'AUTH.logout' } as const;
    },
    authSuccess: (token: string) => ({ type: AUTH.success, token }),
};

export type AuthActionsTypes = InferActionsType<typeof actions>;
