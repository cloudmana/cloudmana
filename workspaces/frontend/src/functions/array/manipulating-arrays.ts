/**
 * @since 2022/12/08
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

export function findObject<T, K extends keyof T>(arrayObject: T[], key: K, val: any): number {
  return arrayObject.findIndex((item) => item[key] === val)
}
