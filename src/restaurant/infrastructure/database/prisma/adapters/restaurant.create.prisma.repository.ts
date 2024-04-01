/* eslint-disable @typescript-eslint/no-unused-vars */
import { RestaurantCreateRepository } from '@/restaurant/application/ports/restaurant.create.repository'
import { RestaurantModel } from '@/restaurant/model/restaurant.model'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { RestaurantFactory } from '../factories/restaurant.factory'

//Adapter
@Injectable()
export class RestaurantCreatePrismaRepository
  implements RestaurantCreateRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(restaurant: RestaurantModel): Promise<RestaurantModel> {
    const toPersist = RestaurantFactory.toCreate(restaurant)
    return await this.prismaService.restaurant.create({
      data: toPersist,
      include: {
        user: true
      }
    })
  }
}
