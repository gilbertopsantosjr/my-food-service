import { ValidationError } from '@core/errors/validation.error'
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common'
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core'

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name)
  private httpAdapter: AbstractHttpAdapter
  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter
  }
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = 400
    const message = `Validation error: ${exception.message}`

    const body = {
      statusCode: status,
      message: message,
      errors: exception.issue
    }

    this.logger.error(message)
    this.httpAdapter.reply(response, body, status)
  }
}
