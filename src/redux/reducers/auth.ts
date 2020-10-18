import { AuthInitialStateType } from 'types/auth';
import { AUTH } from '@/redux/contants';

const initialState: AuthInitialStateType = {
    token: null,
    userId: null,
    email: '',
    expirationDate: null,
};

export default function authReducer(state = initialState, action: any): AuthInitialStateType {
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
}
