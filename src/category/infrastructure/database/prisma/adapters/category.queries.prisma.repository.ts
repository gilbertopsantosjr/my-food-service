/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoryQueriesRepository } from '@/category/application/ports/category.queries.repository'
import { CategoryModel } from '@/category/model/category.model'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { CategoryFactory } from '../factories/category.factory'

//Adapter
@Injectable()
export class CategoryQueriesPrismaRepository
  implements CategoryQueriesRepository
{
  private readonly logger = new Logger(CategoryQueriesPrismaRepository.name)

  constructor(private readonly prismaService: PrismaService) {}

  async findAllByIds(categoryIds: number[]): Promise<CategoryModel[] | []> {
    try {
      const entities = await this.prismaService.category.findMany({
        include: {
          restaurants: true
        },
        where: {
          id: {
            in: categoryIds
          }
        } as Prisma.CategoryWhereInput
      })
      return entities
        ? entities.map((item) => CategoryFactory.toModel(item))
        : []
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async findByTitleAndResturantId(
    title: string,
    restaurantId: number
  ): Promise<CategoryModel | null> {
    try {
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
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async findById(categoryId: number): Promise<CategoryModel | null> {
    try {
      const result = await this.prismaService.category.findUnique({
        where: { id: categoryId },
        include: {
          restaurants: true
        }
      })
      return result ? CategoryFactory.toModel(result) : null
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async findAll(): Promise<CategoryModel[] | []> {
    try {
      const entities = await this.prismaService.category.findMany({
        include: {
          restaurants: true
        }
      })
      return entities
        ? entities.map((item) => CategoryFactory.toModel(item))
        : []
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async findAllByRestaurantId(
    restaurantId: number
  ): Promise<CategoryModel[] | []> {
    try {
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
      return entities
        ? entities.map((item) => CategoryFactory.toModel(item))
        : []
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
