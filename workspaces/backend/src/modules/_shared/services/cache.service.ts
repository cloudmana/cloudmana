/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Cache } from 'cache-manager'
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'

export const CACHE_KEY = {
  FLOOR_PRICE: 'cache-floor-price',
}

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async setKey(key: string, data: string, date: number): Promise<void> {
    await this.cacheManager.set(key, data, date)
  }

  public getKey(key: string): Promise<string | undefined> {
    return this.cacheManager.get(key)
  }

  public removeKey(key: string): Promise<any> {
    return this.cacheManager.del(key)
  }

  public resetAll(): Promise<any> {
    return this.cacheManager.reset()
  }
}
