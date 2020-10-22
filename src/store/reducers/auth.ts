import { AUTH } from '@/store/contants';
import { AuthInitialStateType } from '@/types/auth';
import { AuthActionsTypes } from '@/store/actions/auth';

const initialState: AuthInitialStateType = {
    token: '',
};

const authReducer = (state = initialState, action: AuthActionsTypes): AuthInitialStateType => {
    switch (action.type) {
        case AUTH.success: {
            const { token } = action;

            return {
                ...state,
                token,
            };
        }

        case 'AUTH.logout': {
            return {
                ...state,
                ...initialState,
            };
        }

        default:
            return state;
    }
};

export default authReducer;
