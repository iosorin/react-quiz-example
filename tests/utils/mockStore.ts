import { RootActions, RootState } from '@/types';
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

// internal dependencies

const middlewares = [thunk];
type DispatchExts = ThunkDispatch<RootState, {}, RootActions>;

export const mockStore = createMockStore<RootState, DispatchExts>(middlewares);
