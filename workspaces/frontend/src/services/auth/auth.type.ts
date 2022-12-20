/**
 * @since 2022/12/08
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IUser } from 'src/models/user'
import { IToken } from 'src/models/auth'

export interface ILoginRequest {
  account: string
  password: string
}

export interface ILoginResponse {
  token: IToken
  user: IUser
}

export interface IRegisterRequest {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}
