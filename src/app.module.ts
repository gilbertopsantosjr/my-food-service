import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CategoryModule } from './category/application/category.module'

@Module({
  imports: [ConfigModule.forRoot(), CategoryModule]
})
export class AppModule {}
