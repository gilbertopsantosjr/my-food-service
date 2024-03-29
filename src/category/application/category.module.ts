import { CategoryCreateController } from '@/category/presenters/http/category.create.controller'
import { PrismaModule } from '@core/databases/prisma/prisma.module'
import { Module } from '@nestjs/common'
import {
  CategoryCreatePrismaRepository,
  CategoryQueriesPrismaRepository
} from '../infrastructure/database/prisma/adapters'
import { GetCategoryByIdController } from '../presenters/http/category.getById.controller'
import { CategoryListAllController } from '../presenters/http/category.list.controller'
import { CategoryService } from './category.service'
import { CategoryCreateRepository } from './ports/category.create.repository'
import { CategoryQueriesRepository } from './ports/category.queries.repository'

@Module({
  imports: [PrismaModule.register()],
  controllers: [
    CategoryCreateController,
    CategoryListAllController,
    GetCategoryByIdController
  ],
  providers: [
    {
      provide: CategoryCreateRepository,
      useClass: CategoryCreatePrismaRepository
    },
    {
      provide: CategoryQueriesRepository,
      useClass: CategoryQueriesPrismaRepository
    },
    CategoryService
  ]
})
export class CategoryModule {}
