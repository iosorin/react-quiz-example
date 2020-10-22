import {
    AuthInitialStateType,
    UserType,
    CreateInitialStateType,
    QuizQuestionType,
    UserInitialStateType,
} from '@/types';

import createReducer from '@/store/reducers/create';
import authReducer from '@/store/reducers/auth';
import userReducer from '@/store/reducers/user';

import { actions as qcActions } from '@/store/actions/create';
import { actions as aActions } from '@/store/actions/auth';
import { actions as uActions } from '@/store/actions/user';

describe('AUTH', () => {
    it('should set token on auth', () => {
        const expectedToken = 'token';

        const state: AuthInitialStateType = { token: '' };
        const newState = authReducer(state, aActions.authSuccess(expectedToken));

        expect(newState.token).toEqual(expectedToken);
    });

    it('should clear token on logout', () => {
        const expectedToken = '';

        const state: AuthInitialStateType = { token: 'loreminpsumtoken' };
        const newState = authReducer(state, aActions.logout());

        expect(newState.token).toEqual(expectedToken);
    });
});

describe('USER', () => {
    it('should update user info', () => {
        const state: UserInitialStateType = {
            user: {
                email: '',
                displayName: '',
            },
        };

        const user: UserType = {
            email: 'new email',
            displayName: 'new display name',
        };

        const newState = userReducer(state, uActions.userUpdate(user));

        expect(newState.user?.email).toEqual(user.email);
    });
});

describe('QUIZ CREATION', () => {
    it('should create new quiz question', () => {
        const question: QuizQuestionType = {
            id: 1,
            question: 'questions ?',
            rightAnswerId: 2,
            answers: [
                {
                    id: 1,
                    text: 'answer 1',
                },
                {
                    id: 2,
                    text: 'answer 2',
                },
            ],
        };

        const initialState: CreateInitialStateType = {
            quiz: {
                name: 'My awesome quiz',
                questions: [question],
            },
        };

        const newState = createReducer(initialState, qcActions.createQuizQuestion(question));

        expect(newState.quiz.questions.length).toEqual(2);
    });
});
