import { ValidationError } from '@core/errors/validation.error'
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

type Result = {
  status: number
  timestamp: string
  message: string | object
  errors?: any
  path?: string
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(AllExceptionsFilter.name)

  private httpAdapter: AbstractHttpAdapter

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter
  }

  private catchHttpException(exception: HttpException): Result {
    return {
      status: exception.getStatus(),
      timestamp: new Date().toISOString(),
      message: exception.getResponse()
    } satisfies Result
  }

  private catchValidationException(exception: ValidationError): Result {
    return {
      status: 400,
      timestamp: new Date().toISOString(),
      message: `Validation error: ${exception.message}`,
      errors: exception.issue
    } satisfies Result
  }

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const request = context.getRequest()
    const response = context.getResponse()
    let result: Result

    if (exception instanceof HttpException) {
      result = this.catchHttpException(exception)
    } else if (exception instanceof ValidationError) {
      result = this.catchValidationException(exception)
    } else {
      result = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        message: exceptionShortMessage(exception.message)
      }
    }

    result = { ...result, path: request.path }

    this.logger.error(`an error `, {
      message: result.message,
      status: result.status,
      errors: result.errors
    })

    this.httpAdapter.reply(
      response,
      { message: result.message, errors: result.errors },
      result.status
    )
  }
}
