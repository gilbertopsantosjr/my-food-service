import { CategoryCreateController } from '@/category/presenters/http/category.create.controller'
import { RestaurantQueriesRepository } from '@/restaurant/application/ports/restaurant.queries.repository'
import { RestaurantQueriesPrismaRepository } from '@/restaurant/infrastructure/database/prisma/adapters/restaurant.queries.prisma.repository'
import { PrismaModule } from '@core/databases/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
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
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule.register()],
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
    {
      provide: RestaurantQueriesRepository,
      useClass: RestaurantQueriesPrismaRepository
    },
    CategoryService
  ],
  exports: [CategoryCreateRepository, CategoryQueriesRepository]
})
export class CategoryModule {}
