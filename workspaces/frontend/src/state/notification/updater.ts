/**
 * @since 2022/12/07
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useAppDispatch, useAppSelector } from '../hooks'
import env from 'src/config/env'
import { useUpdateNotification } from './hooks'
import { AppState } from '..'

export default function Updater(): null {
  const dispatch = useAppDispatch()

  const token = useAppSelector((state: AppState) => state.auth.token)
  const updateNotify: any = useUpdateNotification()
  useEffect(() => {
    if (token) {
      const socket = io(env.SOCKET_API as string, {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
      socket.on('connect', function () {
        socket.on('notification', (_data) => {
          updateNotify()
        })
      })
      return () => {
        socket.disconnect()
        socket.close()
      }
    }
    return
  }, [dispatch, token])

  return null
}
