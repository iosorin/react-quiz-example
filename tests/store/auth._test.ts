import { autoLogout } from '../../src/store/actions/auth';
import { mockStore } from '../utils/mockStore';

import { auth, autoLogin } from '@/store/actions/auth';
import { RootState } from '@/types';
import { actions } from '@/store/actions/auth';
import { actions as userActions } from '@/store/actions/user';
import API, { AuthResponseType } from '@/api';

/* api */
jest.mock('@/api');

const response: AuthResponseType = {
    idToken: 'customIdToken',
    expiresIn: '3600',
    email: 'email',
    refreshToken: 'refreshToken',
    localId: 'localId',
};

const request = API.account.auth as jest.MockedFunction<typeof API.account.auth>;
request.mockReturnValue(Promise.resolve(response));

/* store */
const state = { auth: { token: '', pending: false } } as RootState;
const store = mockStore(state);

const authExpectedActions = [
    actions.setAuthPending(true),
    actions.authSuccess(response.idToken),
    // @ts-ignore
    userActions.userUpdate(undefined),
    actions.setAuthPending(false),
];

/* tests */
describe('auth', () => {
    /* clear actions */
    afterEach(() => {
        store.clearActions();
    });

    /* asynchronous example */
    it('should auth', async () => {
        const thunk = auth('email', 'password', true);

        await store.dispatch(thunk);

        expect(store.getActions()).toEqual(authExpectedActions);
    });

    it('should auto login', async () => {
        const action = autoLogin();

        await store.dispatch(action);
        expect(store.getActions()).toEqual(authExpectedActions);
    });

    /* synchronous example */
    it('should logout', () => {
        const action = actions.logout();

        store.dispatch(action);

        return expect(store.getActions()).toEqual([actions.logout()]);
    });

    it('should auto logout', async () => {
        const action = autoLogout(0.01); // 10ms delay

        await store.dispatch(action);

        return expect(store.getActions()).toEqual([actions.logout()]);
    });
});
