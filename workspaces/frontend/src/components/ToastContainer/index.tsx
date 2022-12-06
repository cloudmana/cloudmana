/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { useTransition } from 'react-spring'

import Toast from '../Toast'

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  top: 85px;
  z-index: 9999;
`

const ToastContainer = ({ toasts }) => {
  const transitions = useTransition(toasts, {
    from: { right: '-100%' },
    enter: { right: '5%', marginLeft: '10px' },
    leave: { right: '-100%' },
  })

  return createPortal(
    <Wrapper>
      {transitions((styles, item) => (
        <Toast key={item.id} id={item.id} style={styles} type={item.type}>
          {item.content}
        </Toast>
      ))}
    </Wrapper>,
    document.body,
  )
}

export default ToastContainer
