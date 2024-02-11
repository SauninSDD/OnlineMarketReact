import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

/**
 * Кастомный хук диспатчера для работы с TS
 * @constructor
 */
export const useAppDispatch: () => AppDispatch = useDispatch

/**
 * Кастомный хук селектора для работы с TS
 * @constructor
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector