import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common'
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core'
import { exceptionShortMessage } from './util.exception.filter'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(AllExceptionsFilter.name)

  private httpAdapter: AbstractHttpAdapter

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter
  }

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const request = context.getRequest()
    const response = context.getResponse()

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse()
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              message: exceptionShortMessage(exception.message),
              path: request.path
            }
          }

    this.logger.error(`an error `, { body, status })
    this.httpAdapter.reply(response, body, status)
  }
}
