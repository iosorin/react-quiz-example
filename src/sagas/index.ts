import API from '@/api';
import { AUTH, USER } from '@/store/contants';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// Это воркер Saga. Он будет запускаться на действии типа AUTH.success
function* fetchUser(action: any) {
    try {
        const user = yield call(API.account.fetchUser, action.token);

        yield put({ type: USER.update, user });
    } catch (error) {
        console.log(error);
    }
}

/* Запускаем fetchUser */
/*
    Запускаем "fetchUser" на каждое задиспатченное действие AUTH.success.
    Позволяет одновременно получать данные пользователя.
*/
function* mySaga() {
    yield takeEvery(AUTH.success, fetchUser);
}

/* ------------------ или ------------------ */

/*
    В кач-ве альтернативы можно использоваться "takeLatest".
    Не допускается одновременное получение данных пользователя.
    Если AUTH.success диспатчится в то время, когда предыдущий запрос все еще
    находится в ожидании ответа, то этот ожидающий ответа запрос
    отменяется и срабатывает только последний.
*/
function* rootSaga() {
    yield takeLatest(AUTH.success, fetchUser);
}

export default rootSaga;
