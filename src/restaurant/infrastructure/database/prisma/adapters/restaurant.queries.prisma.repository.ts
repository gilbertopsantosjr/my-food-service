import { RestaurantQueriesRepository } from '@/restaurant/application/ports/restaurant.queries.repository'
import { RestaurantModel } from '@/restaurant/model/restaurant.model'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { RestaurantFactory } from '../factories/restaurant.factory'

@Injectable()
export class RestaurantQueriesPrismaRepository
  implements RestaurantQueriesRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async findByTitleAndUserId(
    title: string,
    userId: number
  ): Promise<RestaurantModel> {
    const query = {
      where: {
        title,
        userId: userId
      } as Prisma.RestaurantWhereUniqueInput,
      include: {
        categories: true
      }
    } satisfies Prisma.RestaurantFindUniqueArgs

    const result = await this.prismaService.restaurant.findUnique(query)
    return result ? RestaurantFactory.toModel(result) : null
  }

  async findById(restaurantId: number): Promise<RestaurantModel> {
    const result = await this.prismaService.restaurant.findUnique({
      where: { id: restaurantId },
      include: {
        user: true,
        categories: true
      }
    })
    return result ? RestaurantFactory.toModel(result) : null
  }

  async findAll(): Promise<RestaurantModel[]> {
    const entities = await this.prismaService.restaurant.findMany({
      include: {
        user: true,
        categories: true
      }
    })
    return entities
      ? entities.map((item) => RestaurantFactory.toModel(item))
      : []
  }

  async findAllByUserId(userId: number): Promise<RestaurantModel[]> {
    const entities = await this.prismaService.restaurant.findMany({
      where: {
        user: {
          some: { id: userId }
        }
      } as Prisma.RestaurantWhereInput,
      include: {
        user: true,
        categories: true
      }
    })
    return entities
      ? entities.map((item) => RestaurantFactory.toModel(item))
      : []
  }
}
