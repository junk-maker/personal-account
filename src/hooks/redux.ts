import type {RootState, AppDispatch} from '../redux';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;