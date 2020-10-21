import API from '@/api';

import { AuthInitialStateType, UserInfoType } from '@/types/auth';
import { InferActionsType, ThunkType } from '@/utils/typing';

import { Dispatch } from 'redux';
import { AUTH } from '../contants';

export const auth = (email: string, password: string, isLogin: boolean): ThunkType<AuthActionsTypes> => async (
    dispatch
) => {
    try {
        const data = await API.account.auth(email, password, isLogin);
        const { idToken: token, expiresIn } = data;

        const user = await API.account.fetchUser(token);

        if (user) {
            const expirationDate = new Date(Date.now() + parseInt(expiresIn) * 1000);

            localStorage.setItem('auth', JSON.stringify({ token, expirationDate }));

            dispatch(actions.authSuccess({ user, token }));
            dispatch(autoLogout(parseInt(expiresIn)));
        }
    } catch (error) {
        console.log(error);
    }
};

/* fix dispatch chain (saga - ?) -> replace 1st 'any' with another async call and last with type of it */
export const autoLogin = (): ThunkType<AuthActionsTypes> => async (dispatch) => {
    const data = localStorage.getItem('auth');
    const payload = data ? JSON.parse(data) : {};
    const { token, expirationDate } = payload;

    if (token) {
        if (expirationDate <= new Date()) {
            dispatch(actions.logout());
        } else {
            const user = await API.account.fetchUser(token);

            if (user) {
                dispatch(actions.authSuccess({ user, token }));
                dispatch(autoLogout((new Date(expirationDate).getTime() - Date.now()) / 1000));
            }
        }
    } else {
        dispatch(actions.logout());
    }
};

/* DispatchType Usage Example - plain */
export const autoLogout = (time: number) => {
    return (dispatch: Dispatch<AuthActionsTypes>) => {
        setTimeout(() => {
            dispatch(actions.logout());
        }, time * 1000);
    };
};

export const updateUserData = ({ email, displayName }: UserInfoType): ThunkType<AuthActionsTypes> => async (
    dispatch,
    getState
) => {
    try {
        const { token } = getState().auth;

        await API.account.updateUser(token, { email, displayName });

        dispatch(actions.setCurrentUser({ email, displayName }));
    } catch (error) {
        console.log(error);
    }
};

export const actions = {
    logout: () => {
        /* todo: move side-effect */
        localStorage.removeItem('auth');

        return {
            type: 'AUTH.logout',
        } as const;
    },
    authSuccess: (payload: AuthInitialStateType) => ({ type: AUTH.success, payload }),
    setCurrentUser: (payload: UserInfoType) => ({ type: AUTH.user.set, payload }),
};

export type AuthActionsTypes = InferActionsType<typeof actions>;
