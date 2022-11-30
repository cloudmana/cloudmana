/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

export interface IPagination<T> extends IPaginationMeta {
  total: number
  items: T[]
}

export interface IPaginationMeta {
  limit: number
  offset: number
}

export interface IHandlePagination<T> extends IHandlePaginationMeta {
  totalPages?: number
  totalItems?: number
  items: T[]
}

export interface IHandlePaginationMeta {
  page: number
  size: number
}
