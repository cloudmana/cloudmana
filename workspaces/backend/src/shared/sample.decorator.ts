/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { ResponseErrorDto } from 'src/common/errors/errors.dto'

export function ApiErrorResponses() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Unauthorized request',
      type: ResponseErrorDto,
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
      type: ResponseErrorDto,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Not found error',
      type: ResponseErrorDto,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad request error',
      type: ResponseErrorDto,
    }),
  )
}
