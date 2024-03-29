/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoryCreateRepository } from '@/category/application/ports/category.create.repository'
import { Category } from '@/category/model/category'
import { Injectable } from '@nestjs/common'
import { CategoryPrismaEntity } from '../entities/category.prisma.entity'
import { CategoryFactory } from '../factories/category.factory'

//Adapter
@Injectable()
export class CategoryCreatePrismaRepository
  implements CategoryCreateRepository
{
  async execute(category: Category): Promise<Category> {
    const categoryPrisma = new CategoryPrismaEntity()
    return CategoryFactory.toDomain(categoryPrisma)
  }
}
