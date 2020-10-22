import { UserInitialStateType } from '@/types';
import { UserActionsType } from '@/store/actions/user';
import { USER } from '@/store/contants';

const initialState = {
    user: {
        email: '',
        displayName: '',
    },
};

const userReducer = (state: UserInitialStateType = initialState, action: UserActionsType) => {
    switch (action.type) {
        case USER.update:
            const { user } = action;

            return {
                ...state,
                user,
            };

        default:
            return state;
    }
};

export default userReducer;
