/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class BaseRequest<T> {
  keyword?: string

  status?: string

  page?: number

  perPage?: number

  sortDate?: string

  startDate?: Date

  endDate?: Date
}
