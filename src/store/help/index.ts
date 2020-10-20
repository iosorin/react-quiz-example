import { RootState } from '@/types/root';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type ThunkType<A extends Action> = ThunkAction<Promise<void> | void, RootState, unknown, A>;

type ProtertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<ProtertiesTypes<T>>;