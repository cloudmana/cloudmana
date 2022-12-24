/**
 * @since 2022/12/08
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IBaseModel } from './base'

export interface ICredentials extends IBaseModel {
  accessKeyId: string
  secretAccessKey: string
  providerId: number | string
  userId: number | string
}
