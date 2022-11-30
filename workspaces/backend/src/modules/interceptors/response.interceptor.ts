import {
  generatePaginationHeaderV2,
  generatePaginationMetadata,
  paginationSpread,
} from '../../shared/helper'
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class BaseTransferInterceptor implements NestInterceptor {
  private updateBodyRequest(body: any) {
    if (body instanceof Object) {
      for (const key of Object.keys(body)) {
        if (key === 'walletAddress' || key === 'contractAddress') {
          body[key] = body[key].toLowerCase()
        } else {
          if (body[key] instanceof Object || body[key] instanceof Array) {
            this.updateBodyRequest(body[key])
          }
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
    for (const p of Object.keys(contextHttpReq.params)) {
      if (contextHttpReq.params[p] && (p === 'walletAddress' || p === 'contractAddress')) {
        contextHttpReq.params[p] = contextHttpReq.params[p].toLowerCase()
      }
    }
    this.updateBodyRequest(contextHttpReq.body)

    const contextHttp = context.switchToHttp().getResponse()

    return next.handle().pipe(
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
