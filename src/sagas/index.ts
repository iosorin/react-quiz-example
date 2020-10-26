import API from '@/api';
import { actions } from '@/store/actions/user';
import { AUTH } from '@/store/constants';
import { Action } from 'redux';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

export interface FetchUserAction extends Action {
    type: typeof AUTH.success;
    token: string;
}

/*  (Worker)
    Будет запускаться на действии типа AUTH.success
    saga typesafe issue -  https://github.com/redux-saga/redux-saga/issues/884
*/

export function* makeUserApiRequest(action: { token: string }) {
    // FetchUserAction
    try {
        const user = yield call(API.account.fetchUser, action.token);

        yield put(actions.userUpdate(user));
    } catch (error) {
        yield put({ type: 'user.fetch.error' } as const);

        console.log(error);
    }
}

/*  (Watcher)
    Запускаем "fetchUser" на каждое задиспатченное действие AUTH.success.
    Позволяет одновременно получать данные пользователя.
*/
export function* fetchUserFromApi() {
    yield takeEvery<FetchUserAction>(AUTH.success, makeUserApiRequest); // typesage ?
}

/* ------------------ или ------------------ */

/*
    В кач-ве альтернативы можно использоваться "takeLatest".
    Здесь - Не допускается одновременное получение данных пользователя.
    Если AUTH.success диспатчится в то время, когда предыдущий запрос все еще
    находится в ожидании ответа, то этот ожидающий ответа запрос
    отменяется и срабатывает только последний.
*/
function* rootSagaAnotherExample() {
    yield takeLatest<FetchUserAction>(AUTH.success, makeUserApiRequest);
}

const rootSaga = function* root() {
    yield all([fetchUserFromApi()]);
};

export default rootSaga;
