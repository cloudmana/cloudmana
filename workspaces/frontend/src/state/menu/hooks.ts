/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../index'
import { activeComponent, activeItem, openComponentDrawer, openDrawer } from './actions'


export function useActiveComponent(): (openComponent: string) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((openComponent: string) => dispatch(activeComponent(openComponent)), [dispatch])
}

export function useActiveItem(): (openItem: string[]) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((openItem: string[]) => dispatch(activeItem(openItem)), [dispatch])
}

export function useOpenComponentDrawer(): (componentDrawerOpen: boolean) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((componentDrawerOpen: boolean) => dispatch(openComponentDrawer(componentDrawerOpen)), [dispatch])
}

export function useOpenDrawer(): (drawerOpen: boolean) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((drawerOpen: boolean) => dispatch(openDrawer(drawerOpen)), [dispatch])
}
