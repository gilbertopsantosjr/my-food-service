/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoryQueriesRepository } from '@/category/application/ports/category.queries.repository'
import { Category } from '@/category/model/category'
import { Injectable } from '@nestjs/common'
import { CategoryPrismaEntity } from '../entities/category.prisma.entity'
import { CategoryFactory } from '../factories/category.factory'

//Adapter
@Injectable()
export class CategoryQueriesPrismaRepository
  implements CategoryQueriesRepository
{
  async findById(categoryId: number): Promise<Category> {
    return CategoryFactory.toDomain(new CategoryPrismaEntity())
  }

  async findAll(categoryId: number): Promise<Category[]> {
    const entities = [new CategoryPrismaEntity()]
    return entities.map((item) => CategoryFactory.toDomain(item))
  }

  async findByRestaurantId(restaurantId: number): Promise<Category[]> {
    const entities = [new CategoryPrismaEntity()]
    return entities.map((item) => CategoryFactory.toDomain(item))
  }
}
