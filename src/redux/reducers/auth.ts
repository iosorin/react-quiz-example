import { AuthInitialStateType } from 'types/auth';
import { AUTH_LOGOUT, AUTH_SUCCESS } from '../actions/actionTypes';

const initialState: AuthInitialStateType = {
    token: null,
    userId: null,
    email: '',
    expirationDate: null,
};

export default function authReducer(state = initialState, action: any): AuthInitialStateType {
    switch (action.type) {
        case AUTH_SUCCESS: {
            const { token, email, expirationDate, userId } = action.payload;

            return {
                ...state,
                token,
                userId,
                email,
                expirationDate,
            };
        }

        case AUTH_LOGOUT: {
            return {
                ...state,
                ...initialState,
            };
        }

        default:
            return state;
    }
}
