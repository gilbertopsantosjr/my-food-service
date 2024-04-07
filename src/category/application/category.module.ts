import { PrismaModule } from '@core/databases/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CategoryCreateController } from '@/category/presenters/http/category.create.controller'
import { RestaurantQueriesRepository } from '@/restaurant/application/ports/restaurant.queries.repository'
import { RestaurantQueriesPrismaRepository } from '@/restaurant/infrastructure/database/prisma/adapters/restaurant.queries.prisma.repository'
import {
  CategoryCreatePrismaRepository,
  CategoryDeletePrismaRepository,
  CategoryQueriesPrismaRepository,
  CategoryUpdatePrismaRepository
} from '../infrastructure/database/prisma/adapters/'
import {
  CategoryListAllController,
  GetCategoryByIdController
} from '../presenters/http'
import { CategoryDeleteController } from '../presenters/http/category.delete.controller'
import { CategoryUpdateController } from '../presenters/http/category.update.controller'
import { CategoryService } from './category.service'
import {
  CategoryCreateRepository,
  CategoryDeleteRepository,
  CategoryQueriesRepository,
  CategoryUpdateRepository
} from './ports/'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule.register()],
  controllers: [
    CategoryCreateController,
    CategoryListAllController,
    GetCategoryByIdController,
    CategoryUpdateController,
    CategoryDeleteController
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
    {
      provide: CategoryUpdateRepository,
      useClass: CategoryUpdatePrismaRepository
    },
    {
      provide: CategoryDeleteRepository,
      useClass: CategoryDeletePrismaRepository
    },
    {
      provide: RestaurantQueriesRepository,
      useClass: RestaurantQueriesPrismaRepository
    },
    CategoryService
  ],
  exports: [CategoryCreateRepository, CategoryQueriesRepository]
})
export class CategoryModule {}
