/**
 * @since 2022/12/24
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IBaseModel } from './base'

export interface IProvider extends IBaseModel {
  name: string
  shortName: string
}
