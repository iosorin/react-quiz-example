import { UserType } from '@/types';
import API from '@/api';
import { actions } from '@/store/actions/user';
import { AUTH } from '@/store/contants';
import { runSaga } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { FetchUserAction, fetchUserFromApi, makeUserApiRequest } from '.';

describe('fetchUserFromApi', () => {
    const gen = fetchUserFromApi();

    it('should wait for every USER FETCH action and call makeUserApiRequest', () => {
        expect(gen.next().value).toEqual(takeEvery<FetchUserAction>(AUTH.success, makeUserApiRequest));
    });

    it('should be done on next iteration', () => {
        expect(gen.next().done).toBeTruthy();
    });
});

describe('makeUserApiRequest', () => {
    it('should call and dispatch success action', async () => {
        const dummyUser: UserType = { email: 'email', displayName: 'displayName' };
        const requestUser = jest.spyOn(API.account, 'fetchUser').mockImplementation(() => Promise.resolve(dummyUser));

        const dispatched: any = [];

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            makeUserApiRequest,
            { token: 'token' }
        );

        expect(requestUser).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([actions.userUpdate(dummyUser)]);

        requestUser.mockClear();
    });

    it('should call and dispatch error action', async () => {
        const requestUser = jest.spyOn(API.account, 'fetchUser').mockImplementation(() => Promise.reject()); // rejected
        const dispatched: any = [];

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            makeUserApiRequest,
            { token: 'token' }
        );

        expect(requestUser).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([{ type: 'user.fetch.error' }]);

        requestUser.mockClear();
    });
});
