import { CategoryCreateController } from '@/category/presenters/http/category.create.controller'
import { Module } from '@nestjs/common'
import { CategoryPrismaModule } from '../infrastructure/database/prisma/category.prisma.module'
import { GetCategoryByIdController } from '../presenters/http/category.getById.controller'
import { CategoryListAllController } from '../presenters/http/category.list.controller'
import { CategoryService } from './category.service'

@Module({
  imports: [CategoryPrismaModule],
  controllers: [
    CategoryCreateController,
    CategoryListAllController,
    GetCategoryByIdController
  ],
  providers: [CategoryService]
})
export class CategoryModule {}
