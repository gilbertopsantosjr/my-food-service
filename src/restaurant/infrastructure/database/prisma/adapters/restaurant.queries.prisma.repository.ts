import { RestaurantQueriesRepository } from '@/restaurant/application/ports/restaurant.queries.repository'
import { ResponseRestaurantDto } from '@/restaurant/model/restaurant.model'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { RestaurantFactory } from '../factories/restaurant.factory'

@Injectable()
export class RestaurantQueriesPrismaRepository
  implements RestaurantQueriesRepository
{
  private readonly logger = new Logger(RestaurantQueriesPrismaRepository.name)
  constructor(private readonly prismaService: PrismaService) {}

  async findByTitleAndUserId(
    title: string,
    userId: number
  ): Promise<ResponseRestaurantDto | null> {
    try {
      const query = {
        where: {
          title,
          userId: userId,
          published: true
        },
        include: {
          categories: true
        }
      }

      const result = await this.prismaService.restaurant.findFirst(query)
      return result ? RestaurantFactory.toModel(result) : null
    } catch (error) {
      this.logger.error(error)
      throw new Error('Error when trying to find a restaurant')
    }
  }

  async findById(restaurantId: number): Promise<ResponseRestaurantDto | null> {
    const result = await this.prismaService.restaurant.findUnique({
      where: { id: restaurantId },
      include: {
        user: true,
        categories: true
      }
    })
    return result ? RestaurantFactory.toModel(result) : null
  }

  async findAll(): Promise<ResponseRestaurantDto[]> {
    const entities = await this.prismaService.restaurant.findMany({
      where: { published: true },
      include: {
        user: true,
        categories: true
      }
    })
    return entities
      ? entities.map((item) => RestaurantFactory.toModel(item))
      : []
  }

  async findAllByUserId(userId: number): Promise<ResponseRestaurantDto[]> {
    const entities = await this.prismaService.restaurant.findMany({
      where: {
        published: true,
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
