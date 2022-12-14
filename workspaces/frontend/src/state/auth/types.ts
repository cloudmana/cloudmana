/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IToken } from 'src/models/auth'
import { IUser } from 'src/models/user'

export enum AuthStatus {
  LOGGED_IN = 'LOGGED_IN',
  NOT_LOGGED_IN = 'NOT_LOGGED_IN',
  DEACTIVATE = 'DEACTIVATE',
}

export interface User extends IUser {}

export interface LoggedInAccount {
  token: IToken
  user?: User
}

export interface AuthState {
  status: AuthStatus
  token?: IToken
  user?: User
  loggedInAccount?: LoggedInAccount[]
}
