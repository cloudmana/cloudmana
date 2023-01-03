/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Pagination } from 'nestjs-typeorm-paginate'

export class BaseResponsePagination<T> extends Pagination<T> {}

export class BaseResponse<T> {
  data: T
}
