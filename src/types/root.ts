import rootReducer from '@/redux/reducers/rootReducer';

import { CreateActionTypes } from '@/redux/actions/create';
import { AuthActionTypes } from '@/redux/actions/auth';
import { QuizActionTypes } from '@/redux/actions/quiz';

export type RootState = ReturnType<typeof rootReducer>;
export type RootAction = QuizActionTypes | CreateActionTypes | AuthActionTypes;
