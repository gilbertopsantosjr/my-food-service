import { CategoryCreateRepository } from '@/category/application/ports/category.create.repository'
import { Module } from '@nestjs/common'
import { CategoryCreateDynamoRepository } from './adapters'

@Module({
  providers: [
    {
      provide: CategoryCreateRepository,
      useClass: CategoryCreateDynamoRepository
    }
  ],
  exports: [CategoryCreateRepository]
})
export class CategoryDynamoModule {}
