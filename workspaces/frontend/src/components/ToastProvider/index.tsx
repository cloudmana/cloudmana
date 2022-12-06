/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import React, { useState, useContext, useCallback } from 'react'
import ToastContainer from '../ToastContainer'

const ToastContext = React.createContext(null)

let id = 1

export enum ToastTypes {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

interface Toast {
  content: string
  type: ToastTypes
}

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(
    (data: Toast) => {
      setToasts((toasts) => [
        ...toasts,
        {
          id: id++,
          content: data.content,
          type: data.type,
        },
      ])
    },
    [setToasts],
  )

  const removeToast = useCallback(
    (id) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id))
    },
    [setToasts],
  )

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  )
}

const useToast = () => {
  const toastHelpers = useContext(ToastContext)

  return toastHelpers
}

export { ToastContext, useToast }
export default ToastProvider
