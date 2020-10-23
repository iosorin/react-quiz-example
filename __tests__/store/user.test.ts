import { UserType, UserInitialStateType } from '@/types';
import { actions } from '@/store/actions/user';
import reducer from '@/store/reducers/user';

describe('USER:actions', () => {
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

        const newState = reducer(state, actions.userUpdate(user));

        expect(newState.user?.email).toEqual(user.email);
    });
});
