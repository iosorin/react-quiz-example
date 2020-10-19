import { AuthInitialStateType } from '@/types/auth';
import { AUTH } from '@/store/contants';
import { AuthActionsTypes } from '@/store/actions/auth';

const initialState: AuthInitialStateType = {
    token: null,
    userId: null,
    email: '',
    expirationDate: null,
};

const authReducer = (state = initialState, action: AuthActionsTypes): AuthInitialStateType => {
    switch (action.type) {
        case AUTH.success: {
            const { token, email, expirationDate, userId } = action.payload;

            return {
                ...state,
                token,
                userId,
                email,
                expirationDate,
            };
        }

        case AUTH.logout: {
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
