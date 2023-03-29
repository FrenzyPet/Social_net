import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../reduxToolkit/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

