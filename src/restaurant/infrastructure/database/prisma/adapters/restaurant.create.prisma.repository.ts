/* eslint-disable @typescript-eslint/no-unused-vars */
import { RestaurantCreateRepository } from '@/restaurant/application/ports/restaurant.create.repository'
import { RestaurantModel } from '@/restaurant/model/restaurant.model'
import { RestaurantWithUser } from '@/restaurant/presenters/http/dto/restaurante.dto'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { RestaurantFactory } from '../factories/restaurant.factory'

//Adapter
@Injectable()
export class RestaurantCreatePrismaRepository
  implements RestaurantCreateRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(restaurant: RestaurantWithUser): Promise<RestaurantModel> {
    const toPersist = RestaurantFactory.toCreate(restaurant)
    const result = await this.prismaService.restaurant.create({
      data: toPersist,
      include: {
        user: true,
        categories: true
      }
    })
    return result ? RestaurantFactory.toModel(result) : null
  }
}
