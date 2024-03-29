import { Module } from '@nestjs/common'
import { CategoryModule } from './category/application/category.module'
import { CategoryInfraModule } from './category/infrastructure/category.infra.module'

@Module({
  imports: [
    CategoryModule.withInfrastructure(CategoryInfraModule.use('prisma'))
  ]
})
export class AppModule {}
