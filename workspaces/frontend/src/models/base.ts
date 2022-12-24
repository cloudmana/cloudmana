/**
 * @since 2022/12/08
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

export interface IBaseModel {
  _id: number | string
  createdAt?: Date
  updatedAt?: Date
}

export interface IBaseMetadata {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface IBaseResponse<T> {
  data: T[]
  metadata: IBaseMetadata
}
