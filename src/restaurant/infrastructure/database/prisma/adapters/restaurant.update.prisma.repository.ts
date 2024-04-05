/* eslint-disable @typescript-eslint/no-unused-vars */
import { RestaurantUpdateRepository } from '@/restaurant/application/ports/restaurant.update.repository'
import { RestaurantModel } from '@/restaurant/model/restaurant.model'
import { UpdateRestaurantDto } from '@/restaurant/presenters/http/dto/restaurante.dto'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { RestaurantFactory } from '../factories/restaurant.factory'

//Adapter
@Injectable()
export class RestaurantUpdatePrismaRepository
  implements RestaurantUpdateRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    restaurant: UpdateRestaurantDto
  ): Promise<RestaurantModel | null> {
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
  }
}
