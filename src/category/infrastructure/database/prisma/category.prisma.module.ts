import { CategoryCreateRepository } from '@/category/application/ports/category.create.repository'
import { CategoryQueriesRepository } from '@/category/application/ports/category.queries.repository'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Module } from '@nestjs/common'
import {
  CategoryCreatePrismaRepository,
  CategoryQueriesPrismaRepository
} from './adapters'

@Module({})
export class CategoryPrismaModule {
  static forRoot(prismaService: PrismaService | any) {
    return {
      module: CategoryPrismaModule,
      providers: [
        {
          provide: PrismaService,
          useValue: prismaService
        },
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
