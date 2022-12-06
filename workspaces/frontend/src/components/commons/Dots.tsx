/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface DotsProps {
  children: ReactNode
  className?: string
}

export function Dots({ children = <span />, className }: DotsProps) {
  return (
    <div className={twMerge('flex flex-col items-center', className)}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span className="text-[#373C3E] font-medium text-base mt-3">{children}</span>
    </div>
  )
}
