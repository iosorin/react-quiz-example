import { actions as authActions, auth } from '@/store/actions/auth';
import API, { AuthResponseType } from '@/api';

jest.mock('@/api');
const accountApiMock = API.account as jest.Mocked<typeof API.account>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

const result: AuthResponseType = {
    idToken: 'customIdToken',
    expiresIn: '3600',
    email: '',
    refreshToken: '',
    localId: '',
};

accountApiMock.auth.mockReturnValue(Promise.resolve(result));

beforeAll(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    accountApiMock.auth.mockClear();
});

describe('AUTH', () => {
    it('should auth', async () => {
        const thunk = auth('bla@bla.bla', 'blabla', true);

        await thunk(dispatchMock, getStateMock, {});

        expect(dispatchMock).toBeCalledTimes(3);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, authActions.authSuccess(result.idToken));
    });
});
