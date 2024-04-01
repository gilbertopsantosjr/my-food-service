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
    title: string,
    restaurantId: number
  ): Promise<CategoryModel> {
    const result = await this.prismaService.category.findFirst({
      where: {
        title,
        restaurants: {
          some: { id: restaurantId }
        }
      } as Prisma.CategoryWhereInput,
      include: {
        restaurants: true
      }
    })
    return result ? CategoryFactory.toModel(result) : null
  }

  async findById(categoryId: number): Promise<CategoryModel> {
    const result = await this.prismaService.category.findUnique({
      where: { id: categoryId },
      include: {
        restaurants: true
      }
    })
    return result ? CategoryFactory.toModel(result) : null
  }

  async findAll(): Promise<CategoryModel[]> {
    const entities = await this.prismaService.category.findMany({
      include: {
        restaurants: true
      }
    })
    return entities ? entities.map((item) => CategoryFactory.toModel(item)) : []
  }

  async findAllByRestaurantId(restaurantId: number): Promise<CategoryModel[]> {
    const entities = await this.prismaService.category.findMany({
      where: {
        restaurants: {
          every: { id: restaurantId }
        }
      } as Prisma.CategoryWhereInput,
      include: {
        restaurants: true
      }
    })
    return entities ? entities.map((item) => CategoryFactory.toModel(item)) : []
  }
}
