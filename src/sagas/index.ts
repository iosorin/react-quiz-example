import API from '@/api';
import { actions } from '@/store/actions/user';
import { AUTH, NOTIFICATION, QUIZ } from '@/store/constants';
import { Action } from 'redux';
import { all, call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';

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
        /* pass API.account context */
        // const user = yield apply(API.account, API.account.fetchUser, [action.token]);
        const user = yield call([API.account, API.account.fetchUser], action.token);

        yield put(actions.userUpdate(user));

        yield put({
            type: NOTIFICATION.show,
            payload: {
                type: 'success',
                message: 'Olá 👋',
            },
        });
    } catch (error) {
        yield showAuthErrorMessage();

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

/* ============================================== */
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
function* hideNotificationWithDelay() {
    yield delay(2000);
    yield put({ type: NOTIFICATION.hide });
}

function* showAuthErrorMessage() {
    yield put({
        type: NOTIFICATION.show,
        payload: { message: 'Something went wrong. Check your credentials', type: 'danger' },
    });
}

/* state usage example */
function* showQuizQuestionCreatedMessage() {
    const state = yield select();
    const { questions } = state.create.newQuiz;
    const { question } = questions[questions.length - 1];

    yield put({
        type: NOTIFICATION.show,
        payload: { message: `The question "${question}" was added`, type: 'default' },
    });
}

function* showQuizCreationMessage() {
    yield put({
        type: NOTIFICATION.show,
        payload: { message: 'Quiz created', type: 'success' },
    });
}

/* ============== Begin Pulling future actions example ============== */
// function* watchAndLogAnyActionButOnlyThreeTimes() {
//     for (let i = 0; i < 3; i++) {
//         const action = yield take('*');
//         console.log('action ' + i, action);
//     }

//     console.log('watchAndLogEverythingButOnlyThreeTimes is finished');
// }

/* another (correct) way to get action state */
function* watchFirstThreeQuestionCreated() {
    for (let i = 0; i < 3; i++) {
        const { question } = yield take(QUIZ.question.create);

        console.log('question', question);
    }

    yield put({
        type: NOTIFICATION.show,
        payload: { message: "Wow! Pretty cool - you've already created 3 questions", type: 'success' },
    });
}

/* function* loginFlow() {
    while (true) {
        yield take('LOGIN');
        // ... perform the login logic
        yield take('LOGOUT');
        // ... perform the logout logic
    }
} */
/* ============== End Pulling future actions example ============== */

const rootSaga = function* root() {
    yield all([
        fetchUserFromApi(),
        takeLatest(NOTIFICATION.show, hideNotificationWithDelay),
        takeLatest(AUTH.error, showAuthErrorMessage),
        takeEvery(QUIZ.creation.finish, showQuizCreationMessage),
        takeEvery(QUIZ.question.create, showQuizQuestionCreatedMessage),
        watchFirstThreeQuestionCreated(),
    ]);
};

export default rootSaga;
