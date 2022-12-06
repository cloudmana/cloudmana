/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

const env = {
  NEXT_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || 'https://www.example.com/',
  SERVER_API: process.env.NEXT_PUBLIC_SERVER_API,
}

export default env
