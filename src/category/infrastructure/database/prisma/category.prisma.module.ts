import { CategoryCreateRepository } from '@/category/application/ports/category.create.repository'
import { CategoryQueriesRepository } from '@/category/application/ports/category.queries.repository'
import { Module } from '@nestjs/common'
import {
  CategoryCreatePrismaRepository,
  CategoryQueriesPrismaRepository
} from './adapters'

@Module({
  providers: [
    {
      provide: CategoryCreateRepository,
      useClass: CategoryCreatePrismaRepository
    },
    {
      provide: CategoryQueriesRepository,
      useClass: CategoryQueriesPrismaRepository
    }
  ],
  exports: [CategoryCreateRepository, CategoryQueriesRepository]
})
export class CategoryPrismaModule {}
