/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeType } from 'src/models/theme'
import { AppDispatch, AppState } from '../index'
import {
  setTheme,
} from './actions'

export function useToggleTheme(theme?: string): () => void {
  const { theme: _theme } = useSelector((state: AppState) => state.application)
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    () => dispatch(setTheme(theme || (_theme == ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK))),
    [dispatch],
  )
}
