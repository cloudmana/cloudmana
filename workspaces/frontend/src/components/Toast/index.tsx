/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useToast } from '../ToastProvider'
import { animated } from 'react-spring'
import Image from 'src/components/Image'

const Wrapper = styled(animated.div)`
  margin-right: 16px;
  margin-top: 16px;
  max-width: 590px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  position: relative;
  padding: 8px 16px;
  border-radius: 4px;
  background: #1f3658;
  color: #ffffff;
`

export interface ToastProps {
  id: string
  style: any
  type: string
}

const Toast = ({ children, id, style, type }: React.PropsWithChildren<ToastProps>) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id)
    }, 4000)

    return () => {
      clearTimeout(timer)
    }
  }, [id, removeToast])

  return (
    <Wrapper style={style}>
      {type === 'success' && <Image src="/images/check-circle.svg" className="w-7 mr-3" />}
      {type === 'error' && <Image src="/images/x-circle-icon.svg" className="w-6 mr-3" />}
      {type === 'warning' && <Image src="/images/warning-triangle.svg" className="w-6 mr-3" />}
      {children}
      <button
        onClick={() => removeToast(id)}
        className="text-base font-semibold text-[#FFFFFF] ml-3"
      >
        x
      </button>
    </Wrapper>
  )
}

export default Toast
