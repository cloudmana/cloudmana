/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  generatePaginationHeaderV2,
  generatePaginationMetadata,
  paginationSpread,
} from '../../helpers/helper'

@Injectable()
export class TransferInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttpReq = context.switchToHttp().getRequest()
    const contextHttp = context.switchToHttp().getResponse()
    return next.handle().pipe(
      // make change the any type to Type suitable with context
      map((data: any) => {
        if (data?.docs) {
          if (contextHttpReq.query.paginationVersion === '2') {
            return {
              ...paginationSpread(data),
              data: data.docs,
              metadata: generatePaginationMetadata(data),
            }
          }

          const paginationHeaders = generatePaginationHeaderV2(data)
          for (const header in paginationHeaders) {
            if (paginationHeaders[header]) {
              contextHttp.header(header, paginationHeaders[header])
            }
          }
          return data.docs
        }
        return data
      }),
    )
  }
}
