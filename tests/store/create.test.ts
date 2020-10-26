import { actions, finishCreateQuiz } from '@/store/actions/create';
import { QuizQuestionType, RootState } from '@/types';
import { initialState } from '@/store/reducers/create';
import { mockStore } from '../utils/mockStore';
import API, { NewQuizResponseType } from '@/api';
import reducer from '@/store/reducers/create';

jest.mock('@/api');
const store = mockStore({ create: initialState } as RootState);

const response: NewQuizResponseType = { name: 'new quiz' };

const request = API.quiz.create as jest.MockedFunction<typeof API.quiz.create>;
request.mockReturnValue(Promise.resolve(response));

describe('quiz creation', () => {
    afterEach(() => {
        store.clearActions();
    });

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

        store.dispatch(actions.createQuizQuestion(question));

        return expect(store.getActions()).toEqual([actions.createQuizQuestion(question)]);
    });

    it('should create new named quiz', async () => {
        const thunk = finishCreateQuiz(response.name);
        const expectedActions = [actions.finishQuizCreation()];

        await store.dispatch(thunk);
        /*to watch state changes - https://github.com/reduxjs/redux-mock-store/issues/85#issuecomment-274343682 */

        return expect(store.getActions()).toEqual(expectedActions);
    });
});
