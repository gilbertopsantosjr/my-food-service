import { CategoryCreateRepository } from '@/category/application/ports/category.create.repository'
import { CategoryQueriesRepository } from '@/category/application/ports/category.queries.repository'
import { PrismaModule } from '@core/databases/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
  CategoryCreatePrismaRepository,
  CategoryQueriesPrismaRepository
} from './adapters'

@Module({})
export class CategoryPrismaModule {
  static forRoot() {
    return {
      module: CategoryPrismaModule,
      imports: [ConfigModule.forRoot(), PrismaModule.register()],
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
    }
  }
}
