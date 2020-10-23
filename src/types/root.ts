import { QuizActionsTypes } from './../store/actions/quiz';
import { UserActionsType } from './../store/actions/user';
import { AuthActionsTypes } from '@/store/actions/auth';
import rootReducer from '@/store/reducers';

export type RootState = ReturnType<typeof rootReducer>;
export type RootActions = AuthActionsTypes | UserActionsType | QuizActionsTypes;
