import { actions, auth } from '@/store/actions/auth';
import { asyncActions } from '@/store/actions/user';
import { AuthInitialStateType } from '@/types';
import reducer from '@/store/reducers/auth';
import API, { AuthResponseType } from '@/api';

jest.mock('@/api');

// jest.mock('@/api', () => require('../__mocks__/api'));

const authRequest = API.account.auth as jest.MockedFunction<typeof API.account.auth>;

const response: AuthResponseType = {
    idToken: 'customIdToken',
    expiresIn: '3600',
    email: 'email',
    refreshToken: 'refreshToken',
    localId: 'localId',
};

authRequest.mockReturnValue(Promise.resolve(response));

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

describe('AUTH', () => {
    describe('actions', () => {
        it('should set token on auth', () => {
            const expectedToken = 'token';

            const state: AuthInitialStateType = { token: '', pending: false };
            const newState = reducer(state, actions.authSuccess(expectedToken));

            expect(newState.token).toEqual(expectedToken);
        });

        it('should clear token on logout', () => {
            const expectedToken = '';

            const state: AuthInitialStateType = { token: 'loreminpsumtoken', pending: false };
            const newState = reducer(state, actions.logout());

            expect(newState.token).toEqual(expectedToken);
        });
    });

    describe('async actions', () => {
        beforeAll(() => {
            dispatchMock.mockClear();
            getStateMock.mockClear();
            authRequest.mockClear();
        });

        it('should auth', async () => {
            const thunk = auth('bla@bla.bla', 'blabla', true);

            // Thunk syntax: (dispatch, getState, extraArguments) => ?
            await thunk(dispatchMock, getStateMock, {});

            expect(dispatchMock).toBeCalledTimes(5);

            expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setAuthPending(true));
            expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.authSuccess(response.idToken));
            // expect(dispatchMock).toHaveBeenNthCalledWith(3, waitExpiration(+response.expiresIn));
            // expect(dispatchMock).toHaveBeenNthCalledWith(4, asyncActions.fetchUser(response.idToken));
            expect(dispatchMock).toHaveBeenNthCalledWith(5, actions.setAuthPending(false));
            expect(asyncActions.fetchUser).toHaveBeenCalled();
        });
    });
});
