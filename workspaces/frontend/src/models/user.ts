/**
 * @since 2022/12/08
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

export interface IUser {
  _id: number | string
  email: string
  username: string
  avatar?: string
  firstName: string
  lastName: string
  fullName: string
  isActive: boolean
  role: string
  roles: string
}
