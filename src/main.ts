import { AllExceptionsFilter } from '@core/filters/exception.filter'
import { PrismaClientExceptionFilter } from '@core/filters/prisma-client-exception.filter'
import { ValidationExceptionFilter } from '@core/filters/validation.filter'
import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(app.get(HttpAdapterHost)),
    new ValidationExceptionFilter(app.get(HttpAdapterHost)),
    new AllExceptionsFilter(app.get(HttpAdapterHost))
  )
  await app.listen(3000)
}
bootstrap()
