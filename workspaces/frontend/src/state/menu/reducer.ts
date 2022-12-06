/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { createReducer } from '@reduxjs/toolkit'
import { activeComponent, activeItem, openComponentDrawer, openDrawer } from './actions'

export interface MenuState {
  openItem: string[]
  openComponent: string
  drawerOpen: boolean
  componentDrawerOpen: boolean
}

const initialState: MenuState = {
  openItem: ['dashboard'],
  openComponent: 'buttons',
  drawerOpen: false,
  componentDrawerOpen: true,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(activeComponent, (state, action) => {
      state.openComponent = action.payload
    })
    .addCase(activeItem, (state, action) => {
      state.openItem = action.payload
    })
    .addCase(openComponentDrawer, (state, action) => {
      state.componentDrawerOpen = action.payload
    })
    .addCase(openDrawer, (state, action) => {
      state.drawerOpen = action.payload
    }),
)
