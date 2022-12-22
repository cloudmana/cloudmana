/**
 * @since 2022/12/02
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { PrimaryIdType } from 'src/common/types/entity.type'

export interface IPayload {
  username: string
  userId: PrimaryIdType
  email: string
  role: string
  roles: string
}
