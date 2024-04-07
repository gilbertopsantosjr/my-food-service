/* eslint-disable @typescript-eslint/no-unused-vars */
import { RestaurantUpdateRepository } from '@/restaurant/application/ports/restaurant.update.repository'
import {
  ResponseRestaurantDto,
  UpdateRestaurantDto
} from '@/restaurant/model/restaurant.model'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Injectable, Logger } from '@nestjs/common'
import { RestaurantFactory } from '../factories/restaurant.factory'
import { RestaurantQueriesPrismaRepository } from './restaurant.queries.prisma.repository'

//Adapter
@Injectable()
export class RestaurantUpdatePrismaRepository
  implements RestaurantUpdateRepository
{
  private readonly logger = new Logger(RestaurantQueriesPrismaRepository.name)
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    restaurant: UpdateRestaurantDto
  ): Promise<ResponseRestaurantDto | null> {
    try {
      const toPersist = RestaurantFactory.toPersist(restaurant)
      const result = await this.prismaService.restaurant.update({
        data: toPersist,
        where: {
          id: restaurant.id
        },
        include: {
          categories: true
        }
      })
      return result ? RestaurantFactory.toModel(result) : null
    } catch (error) {
      this.logger.error(
        `Error updating a restaurant ${restaurant.title}`,
        error
      )
      throw error
    }
  }
}
