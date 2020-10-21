import API from '@/api';

import { AuthInitialStateType } from '@/types/auth';

import { Dispatch } from 'redux';
import { InferActionsType, ThunkType } from '@/store/help';

/* ThunkAction Usage Example (@/store/help) */
export const auth = (email: string, password: string, isLogin: boolean): ThunkType<AuthActionsTypes> => async (
    dispatch
) => {
    try {
        const data = await API.account.auth(email, password, isLogin);
        const expirationDate = new Date(Date.now() + parseInt(data.expiresIn) * 1000);

        const payload = {
            token: data.idToken,
            userId: data.localId,
            expirationDate,
            email,
        };

        localStorage.setItem('auth', JSON.stringify(payload));

        dispatch(actions.authSuccess(payload));
        dispatch(autoLogout(parseInt(data.expiresIn)));
    } catch (error) {
        console.log(error);
    }
};

/* fix dispatch chain (saga - ?) -> replace 1st 'any' with another async call and last with type of it */
export const autoLogin = (): ThunkType<AuthActionsTypes> => async (dispatch) => {
    const data = localStorage.getItem('auth');
    const payload = data ? JSON.parse(data) : {};

    if (payload.token) {
        if (payload.expirationDate <= new Date()) {
            dispatch(actions.logout());
        } else {
            dispatch(actions.authSuccess(payload));
            dispatch(autoLogout((new Date(payload.expirationDate).getTime() - Date.now()) / 1000));
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

/* Example of excess (or not, not sure) constants declaration fix*/
export const actions = {
    logout: () => {
        /* todo: fix side-effect */
        localStorage.removeItem('auth');

        return {
            type: 'AUTH.logout',
        } as const;
    },
    authSuccess: (payload: AuthInitialStateType) => ({ type: 'AUTH.success', payload } as const),
};

export type AuthActionsTypes = InferActionsType<typeof actions>;
