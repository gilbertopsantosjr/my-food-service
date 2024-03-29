/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoryQueriesRepository } from '@/category/application/ports/category.queries.repository'
import { CategoryModel } from '@/category/model/category.model'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { CategoryFactory } from '../factories/category.factory'

//Adapter
@Injectable()
export class CategoryQueriesPrismaRepository
  implements CategoryQueriesRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async findByTitleAndResturantId(
    name: string,
    restaurantId: number
  ): Promise<CategoryModel> {
    const result = await this.prismaService.category.findFirst({
      where: {
        name,
        restaurants: {
          some: { id: restaurantId }
        }
      } as Prisma.CategoryWhereInput
    })
    return CategoryFactory.toModel(result)
  }

  async findById(categoryId: number): Promise<CategoryModel> {
    const result = await this.prismaService.category.findUnique({
      where: { id: categoryId }
    })
    return CategoryFactory.toModel(result)
  }

  async findAll(): Promise<CategoryModel[]> {
    const entities = await this.prismaService.category.findMany()
    return entities.map((item) => CategoryFactory.toModel(item))
  }

  async findAllByRestaurantId(restaurantId: number): Promise<CategoryModel[]> {
    const entities = await this.prismaService.category.findMany({
      where: {
        restaurants: {
          some: { id: restaurantId }
        }
      } as Prisma.CategoryWhereInput
    })
    return entities.map((item) => CategoryFactory.toModel(item))
  }
}
