/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import {
  generatePaginationHeaderV2,
  generatePaginationMetadata,
  paginationSpread,
} from '../../helpers/helper'
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { instanceToPlain } from 'class-transformer'

@Injectable()
export class BaseTransferInterceptor implements NestInterceptor {
  private updateBodyRequest(body: any) {
    if (body instanceof Object) {
      for (const key of Object.keys(body)) {
        if (body[key] instanceof Object || body[key] instanceof Array) {
          this.updateBodyRequest(body[key])
        }
      }
    } else {
      if (body instanceof Array) {
        for (const b of body) {
          this.updateBodyRequest(b)
        }
      }
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttpReq = context.switchToHttp().getRequest()
    this.updateBodyRequest(contextHttpReq.body)

    const contextHttp = context.switchToHttp().getResponse()

    return next
      .handle()
      .pipe(
        map((data: any) => {
          if (data?.items) {
            if (contextHttpReq.query.paginationVersion === '2') {
              return {
                ...paginationSpread(data),
                data: data.items,
                metadata: generatePaginationMetadata(data),
              }
            }

            const paginationHeaders = generatePaginationHeaderV2(data)
            for (const header in paginationHeaders) {
              if (paginationHeaders[header]) {
                contextHttp.header(header, paginationHeaders[header])
              }
            }
            return data.items
          }
          return data
        }),
      )
      .pipe(map((data) => instanceToPlain(data)))
  }
}
