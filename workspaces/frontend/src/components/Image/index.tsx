/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import _Image from 'next/image'

export interface ImageProps {
  src: string
  alt?: string
  width?: number | `${number}`
  height?: number | `${number}`
  className?: any
}

const myLoader = ({ src, width, quality }: any) => {
  return `/${src}?w=${width}&q=${quality || 75}`
}

const Image = (props: ImageProps) => {
  const { alt = 'image' } = props
  return <_Image loader={new RegExp('^_next').test(props.src) ? myLoader : undefined} {...props} alt={alt} />
}

export default Image
