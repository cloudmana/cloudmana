/**
 * @since 2022/12/08
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

export interface IUser {
  id: number | string
  email: string
  username: string
  firstName: string
  lastName: string
  isActive: boolean
  role: string
  roles: string
}
