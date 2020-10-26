import API from '@/api';
import { UserType } from '@/types';
import { BaseThunkType, InferActionsType } from '@/utils/typing';
import { USER } from '@/store/constants';

export const sendUserUpdate = ({ email, displayName }: UserType): BaseThunkType<UserActionsType> => async (
    dispatch,
    getState
) => {
    try {
        const { token } = getState().auth;

        await API.account.updateUser(token, { email, displayName });

        dispatch(actions.userUpdate({ email, displayName }));
    } catch (error) {
        console.log(error);
    }
};

// export const userFetch = (token: string): BaseThunkType<UserActionsType> => async (dispatch) => {
//     try {
//         const user = await API.account.fetchUser(token);

//         dispatch(actions.userUpdate(user));
//     } catch (error) {
//         console.log(error);
//     }
// };

export const actions = {
    userUpdate: (user: UserType) => ({ type: USER.update, user }),
};

export type UserActionsType = InferActionsType<typeof actions>;
