import { CategoryCreateController } from '@/category/presenters/http/category.create.controller'
import { DynamicModule, Module, Type } from '@nestjs/common'
import { CategoryCreatePrismaRepository } from '../infrastructure/database/prisma/adapters'
import { CategoryCreateService } from './category.service'
import { CategoryCreateRepository } from './ports/category.create.repository'

@Module({})
export class CategoryModule {
  static withInfrastructure(infraModule: Type | DynamicModule) {
    return {
      module: CategoryModule,
      imports: [infraModule],
      controllers: [CategoryCreateController],
      providers: [
        {
          provide: CategoryCreateRepository,
          useClass: CategoryCreatePrismaRepository
        },
        CategoryCreateService
      ]
    }
  }
}
