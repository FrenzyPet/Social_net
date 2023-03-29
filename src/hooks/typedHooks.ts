import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import store, { RootState } from '../reduxToolkit/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

