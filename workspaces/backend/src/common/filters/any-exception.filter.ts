import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'

@Catch()
export default class AnyExceptionFilter<Error> implements ExceptionFilter {
  constructor(
    @InjectPinoLogger(AnyExceptionFilter.name)
    private readonly logger: PinoLogger,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error  ' + exception.toString()

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error({ err: exception }, 'Caught exception')
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
