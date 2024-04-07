/* eslint-disable @typescript-eslint/no-unused-vars */
import { RestaurantCreateRepository } from '@/restaurant/application/ports/restaurant.create.repository'
import {
  CreateRestaurantDto,
  ResponseRestaurantDto
} from '@/restaurant/model/restaurant.model'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Injectable, Logger } from '@nestjs/common'
import { RestaurantFactory } from '../factories/restaurant.factory'

//Adapter
@Injectable()
export class RestaurantCreatePrismaRepository
  implements RestaurantCreateRepository
{
  private readonly logger = new Logger(RestaurantCreatePrismaRepository.name)
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    restaurant: CreateRestaurantDto
  ): Promise<ResponseRestaurantDto | null> {
    try {
      const toPersist = RestaurantFactory.toPersist(restaurant)
      const result = await this.prismaService.restaurant.create({
        data: toPersist,
        include: {
          user: true,
          categories: true
        }
      })
      return result ? RestaurantFactory.toModel(result) : null
    } catch (error) {
      this.logger.error(
        `Error creating a restaurant ${restaurant.title}`,
        error
      )
      throw error
    }
  }
}
