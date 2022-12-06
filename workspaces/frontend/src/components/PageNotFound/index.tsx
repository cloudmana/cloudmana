/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// import { LinkButton } from '../Buttons/link-button'

export default function PageNotFound() {
  return (
    <div className="not-found-page">
      <div className="flex flex-col items-center">
        <p className="text-primary text-[120px] font-semibold">404</p>
        <p className="text-secondary text-2xl lg:text-5xl font-semibold mb-4">Page Not Found</p>
        <p className="text-[#636366] text-lg font-bold max-w-[542px] text-center mb-8">
          We've explored deep and wide, <br /> but we can't find the page you were looking for.
        </p>
        <div className="max-w-[255px]">
          {/* <LinkButton url="/" label="Navigate back home" isNewTab={false} /> */}
        </div>
      </div>
    </div>
  )
}
